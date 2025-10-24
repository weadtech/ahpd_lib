# Changelog

# 1.0.2 - 2025-10-24

### Changed

* **Criteria Display:** The **normalization logic for breakdown data** (`alternatives_contribution.by_criteria`) has been improved. It now applies a two-step normalization that ensures that:
1. The lowest negative value is correctly mapped to `min` (e.g., **0**).
2. The **sum of normalized values** for each alternative is always equal to the `total sum` (e.g., **100**).

This ensures a better and more consistent display of criteria performance, especially those derived from original data that include negative values.

## Changelog

# 1.0.0 - 2025-10-16

### Added

* **Stable Release:** Initial stable release of the `ahpd` PHP extension.
* **Core Functionality:** Full implementation of all advertised AHPd (AHPd — Data-Driven) library features.
* **Cross-Platform Support:** Officially support Linux and Windows environments for both Thread Safe (TS) and Non-Thread Safe (NTS) PHP builds.
* **Architecture Support:** Provides pre-built binaries and full support for the x86\_64 (amd64) architecture.
* **Documentation:** Comprehensive initial documentation for installation and usage.

### Changed

* **Extension Stability:** Transition from beta/RC status to a stable 1.0.0 public Extension.

### Fixed

* No known major bugs or regressions upon stable release.