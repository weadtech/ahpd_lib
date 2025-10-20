# =========================================================================
# PROJECT CONFIGURATION VARIABLES
# =========================================================================

# Extension name
EXTENSION_NAME = ahpd

# Release version to be downloaded (CHANGE FOR EACH NEW RELEASE)
RELEASE_VERSION = 1.0.0

# Base URL for GitHub Releases
GITHUB_REPO = weadtech/ahpd_lib
BASE_URL = https://github.com/$(GITHUB_REPO)/releases/download/$(RELEASE_VERSION)

# Temporary directory for extraction
TMP_DIR = $(top_builddir)/$(EXTENSION_NAME)_install

# Directory where make expects to find the .so (for the build process)
PHP_MODULES_DIR = $(top_builddir)/modules

# =========================================================================
# PHP ENVIRONMENT VARIABLES
# =========================================================================

# Get local PHP information (executed during 'make')
PHP_VERSION := $(shell php -r "echo PHP_VERSION;")
PHP_MAJOR_MINOR := $(shell php -r "echo PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION;")
PHP_ARCH := $(shell php -r "echo PHP_INT_SIZE==8 ? 'x86_64' : 'x86';")
PHP_THREAD := $(shell php -r "echo defined('ZTS') && ZTS ? 'ts' : 'nts';")

# =========================================================================
# REMOTE AND LOCAL FILE (TGZ ONLY)
# =========================================================================

# Expected download filename (e.g., linux_php_ahpd-1.0.0-8.1-nts-x86_64.tgz)
# NOTE: Adjust this pattern if the naming convention on GitHub changes.
PACKAGE_BASENAME = linux_php_$(EXTENSION_NAME)-$(RELEASE_VERSION)-$(PHP_MAJOR_MINOR)-$(PHP_THREAD)-$(PHP_ARCH)
PACKAGE_EXT = .tgz
PACKAGE_FILENAME = $(PACKAGE_BASENAME)$(PACKAGE_EXT)

# Complete package URL
PACKAGE_URL = $(BASE_URL)/$(PACKAGE_FILENAME)

# Local path for the downloaded file
DOWNLOAD_PATH = $(TMP_DIR)/$(PACKAGE_FILENAME)

# Variables for 'all' and 'clean' targets
SHLIB_NAME = $(EXTENSION_NAME).so
SHARED_LIB = $(PHP_MODULES_DIR)/$(SHLIB_NAME)

# =========================================================================
# TARGETS
# =========================================================================

# Intermediate target to prepare/uncompress the binary
prepare:
	@echo "🔍 Detecting PHP environment..."
	@echo "    PHP version: $(PHP_VERSION)"
	@echo "    Architecture: $(PHP_ARCH)"
	@echo "    Thread safety: $(PHP_THREAD)"
	@echo "    Release version: $(RELEASE_VERSION)"
	@echo "    Expected package: $(PACKAGE_FILENAME)"
	@echo ""

	# 1. Preparation: Create the temporary directory
	@mkdir -p "$(TMP_DIR)"

	# 2. Download the package
	@echo "🌐 Checking package availability: $(PACKAGE_URL)"
	@if command -v curl >/dev/null 2>&1; then \
		if ! curl -sfI "$(PACKAGE_URL)" >/dev/null; then \
			echo "❌ Error: Package URL not accessible or does not exist: $(PACKAGE_URL)"; \
			exit 1; \
		fi; \
	elif command -v wget >/dev/null 2>&1; then \
		if ! wget --spider -q "$(PACKAGE_URL)"; then \
			echo "❌ Error: Package URL not accessible or does not exist: $(PACKAGE_URL)"; \
			exit 1; \
		fi; \
	else \
		echo "❌ Error: Neither 'curl' nor 'wget' found. Please install one of them to download the assets."; \
		exit 1; \
	fi

	@echo "🌐 Downloading package from: $(PACKAGE_URL)"
	@if command -v curl >/dev/null 2>&1; then \
		curl -L -o "$(DOWNLOAD_PATH)" "$(PACKAGE_URL)"; \
	elif command -v wget >/dev/null 2>&1; then \
		wget -q -O "$(DOWNLOAD_PATH)" "$(PACKAGE_URL)"; \
	fi

	# Verify successful download
	@if [ ! -s "$(DOWNLOAD_PATH)" ]; then \
		echo "❌ Download failed or package is empty. Check the URL and version: $(PACKAGE_URL)"; \
		exit 1; \
	fi
	@echo "✅ Download complete."

	# 3. Extract the package (Using tar -xzf for .tgz)
	@echo "📦 Extracting package: $(DOWNLOAD_PATH)"
	@tar -xzf "$(DOWNLOAD_PATH)" -C "$(TMP_DIR)" # Extract the entire package to TMP_DIR
	
	# 4. Locate and copy the binary
	@echo "🔧 Locating and copying correct build..."
	@mkdir -p "$(PHP_MODULES_DIR)"
	@sh -c 'SRC_FILE=$$(find "$(TMP_DIR)" -type f -path "*.so" | head -n 1); \
if [ -z "$$SRC_FILE" ]; then \
    echo "❌ No suitable build found for PHP $(PHP_VERSION) in $(TMP_DIR)"; \
    exit 1; \
fi; \
echo "✅ Found compatible build: $$SRC_FILE"; \
cp "$$SRC_FILE" "$(PHP_MODULES_DIR)/$(EXTENSION_NAME).so"; \
echo "📂 Copied to: $(PHP_MODULES_DIR)/$(EXTENSION_NAME).so"'

	@if [ ! -f "$(PHP_MODULES_DIR)/$(EXTENSION_NAME).so" ]; then \
		echo "❌ Copy verification failed! Target file not found after copy."; \
		exit 1; \
	fi
	@echo "🎉 Pre-build preparation complete."
	
# The 'all' target depends on 'prepare' to ensure the .so is in place.
all: prepare
	@echo "📦 .so is ready in $(PHP_MODULES_DIR)/"

clean:
	@echo "🧹 Cleaning temporary files..."
	@rm -rf $(TMP_DIR)
	@rm -f $(PHP_MODULES_DIR)/$(EXTENSION_NAME).so
	@echo "✅ Done."