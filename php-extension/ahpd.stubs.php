<?php

// Stubs for ahpd

namespace AHPd {
    class Data {
        public function fromJsonString(string $json_string): mixed {}

        public function fromJsonFile(string $file_path): mixed {}

        public function setCriteria(array $criteria_list): mixed {}

        public function getCriteria(string $criteria_name): ?string {}

        public function listCriteria(): mixed {}

        public function setOption(string $name, array $params): mixed {}

        public function getOption(string $option_name): mixed {}

        private function addOption(\AHPd\Data\Option $option): mixed {}

        public function listOptions(): array {}

        public function run(?bool $rank, ?bool $contribution_global, ?bool $contribution_detailed): mixed {}

        public function __construct() {}
    }
}
