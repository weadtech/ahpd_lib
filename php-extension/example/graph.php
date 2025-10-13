<?php

if (!extension_loaded('ahpd')) {
    throw new \Exception("Extension not loaded");
}

use \AHPd\Data;

$ahp = new Data;

// 1. Critérios
$ahp->setCriteria([
    'price US$'    => 'min',
    'storage GB'   => 'max',
    'memory GB'    => 'max',
    'camera Mpx'   => 'max',
    'battery mAh'  => 'max',
]);

// 2. Opções
$ahp->setOption('Phone A', [
    'price US$'    => 9494,
    'storage GB'   => 128,
    'memory GB'    => 6,
    'camera Mpx'   => 48,
    'battery mAh'  => 4323,
]);
$ahp->setOption('Phone B', [
    'price US$'    => 4139,
    'storage GB'   => 256,
    'memory GB'    => 8,
    'camera Mpx'   => 50,
    'battery mAh'  => 4500,
]);
$ahp->setOption('Phone C', [
    'price US$'    => 4429,
    'storage GB'   => 256,
    'memory GB'    => 8,
    'camera Mpx'   => 50,
    'battery mAh'  => 4300,
]);
$ahp->setOption('Phone D', [
    'price US$'    => 1885,
    'storage GB'   => 128,
    'memory GB'    => 6,
    'camera Mpx'   => 64,
    'battery mAh'  => 5065,
]);

$results = $ahp->run();

$criteria_data = $results['contribution']['alternatives_contribution']['by_criteria'];
$rank_data = $results['contribution']['alternatives_contribution']['total_percentage'];
$criteria_weights = $results['contribution']['criteria_weights']; // NOVO: Captura os pesos!

$phones = array_keys($criteria_data);
$criteria_names = array_keys(current($criteria_data));
$datasets = [];
$colors = ['#1abc9c', '#3498db', '#9b59b6', '#e67e22', '#e74c3c'];
$color_index = 0;

foreach ($criteria_names as $crit) {
    $data_values = [];
    foreach ($phones as $phone) {
        $data_values[] = round($criteria_data[$phone][$crit], 2);
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
    'labels' => $phones,
    'datasets' => $datasets,
    'criteria_weights' => $criteria_weights, // CHAVE PARA O NOVO GRÁFICO!
];

// -----------------------------------------------------------------------------
// INJEÇÃO NO TEMPLATE E SALVAMENTO (Mesmo código de antes)
// -----------------------------------------------------------------------------

$json_string = json_encode($chart_data, JSON_PRETTY_PRINT);
$js_code = "CHART_DATA = " . $json_string . ";"; 

$template_file = 'chart_template.html';
$output_file = 'index.html';
$placeholder = '// CHART_DATA_PLACEHOLDER';

if (!file_exists($template_file)) {
    die("Error: The template file '{$template_file}' was not found.\n");
}

$template_content = file_get_contents($template_file);
$final_html = str_replace($placeholder, $js_code, $template_content);
file_put_contents($output_file, $final_html);

echo "Final HTML report generated successfully! Open '{$output_file}' in your browser.\n";