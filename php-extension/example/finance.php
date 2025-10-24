<?php

if (!extension_loaded('ahpd')) {
    throw new \Exception("Extension not loaded");
}
use \AHPd\Data;

$json_file = dirname(__FILE__). '/finance.json';

if (!file_exists($json_file)) {
    throw new \Exception("JSON file not found: {$json_file}");
}

$json_data = file_get_contents($json_file);
$config = json_decode($json_data, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    throw new \Exception("JSON decode error: " . json_last_error_msg());
}

$data = $config['data'];
$criteria_preferences = $data['criteria'];
$options_data = $data['options'];


$ahp = new Data;

$ahp->setCriteria($criteria_preferences);

$criteria_names = array_keys($criteria_preferences);

foreach ($options_data as $option_name => $values) {
    $mapped_params = array_combine($criteria_names, $values);

    $ahp->setOption($option_name, $mapped_params);
}

$results = $ahp->run(
    rank: true,
    contribution_global: true,
    contribution_detailed: true
);

$criteria_data = $results['contribution']['alternatives_contribution']['by_criteria'];
$rank_data = $results['rank'];
$criteria_weights = $results['contribution']['criteria_weights']; // NOVO: Captura os pesos!

$rank_data = array_map(function($value) {
    return $value * 100;
}, $rank_data);

$bank = array_keys($criteria_data);
$criteria_names = array_keys(current($criteria_data));
$datasets = [];
$colors = ['#1abc9c', '#3498db', '#9b59b6', '#e67e22', '#e74c3c'];
$color_index = 0;

foreach ($criteria_names as $crit) {
    $data_values = [];
    foreach ($bank as $b) {
        $data_values[] = $criteria_data[$b][$crit];
    }
    
    $datasets[] = [
        'label' => $crit,
        'data' => $data_values,
        'backgroundColor' => $colors[$color_index % count($colors)],
        'rank_total' => $rank_data, 
    ];
    $color_index++;
}

// NOVO: Adiciona os pesos ao objeto principal de dados
$chart_data = [
    'labels' => $bank,
    'datasets' => $datasets,
    'criteria_weights' => $criteria_weights, // CHAVE PARA O NOVO GRÁFICO!
];

// -----------------------------------------------------------------------------
// INJEÇÃO NO TEMPLATE E SALVAMENTO (Mesmo código de antes)
// -----------------------------------------------------------------------------

$json_string = json_encode($chart_data, JSON_PRETTY_PRINT);
$js_code = "CHART_DATA = " . $json_string . ";"; 

$template_file = 'chart_template.html';
$output_file = 'index_finance.html';
$placeholder = '// CHART_DATA_PLACEHOLDER';

if (!file_exists($template_file)) {
    die("Error: The template file '{$template_file}' was not found.\n");
}

$template_content = file_get_contents($template_file);
$final_html = str_replace($placeholder, $js_code, $template_content);
file_put_contents($output_file, $final_html);

echo "Final HTML report generated successfully! Open '{$output_file}' in your browser.\n";