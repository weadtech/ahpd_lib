# Nome da extensão
EXTENSION_NAME = ahpd

# Diretório de release onde estão os pacotes pré-compilados
RELEASE_DIR = release/linux

# Diretório temporário para extração
# CORREÇÃO: Usa o diretório de build do PIE
TMP_DIR = $(top_builddir)/$(EXTENSION_NAME)_install

# Obtém informações do PHP local (executado durante 'make')
PHP_VERSION := $(shell php -r "echo PHP_VERSION;")
PHP_MAJOR_MINOR := $(shell php -r "echo PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION;")
PHP_ARCH := $(shell php -r "echo PHP_INT_SIZE==8 ? 'x86_64' : 'x86';")
PHP_THREAD := $(shell php -r "echo defined('ZTS') && ZTS ? 'ts' : 'nts';")

# Diretório onde o make espera encontrar o .so
PHP_MODULES_DIR = $(top_builddir)/modules

# Detecta automaticamente o pacote mais recente correspondente à arquitetura e thread
PACKAGE := $(shell ls -1 $(RELEASE_DIR)/$(EXTENSION_NAME)-*-$(PHP_THREAD)-$(PHP_ARCH).tgz 2>/dev/null | sort -V | tail -n 1)

# Target intermediário para preparar/descompactar o binário
prepare:
	@echo "🔍 Detecting PHP environment..."
	@echo "   PHP version: $(PHP_VERSION)"
	@echo "   Architecture: $(PHP_ARCH)"
	@echo "   Thread safety: $(PHP_THREAD)"
	@echo "   Temp dir: $(TMP_DIR)"
	@echo ""

	@if [ -z "$(PACKAGE)" ]; then \
		echo "❌ No package found for this configuration in $(RELEASE_DIR)"; \
		exit 1; \
	fi

	@echo "📦 Using package: $(PACKAGE)"
	@mkdir -p "$(TMP_DIR)"  # Cria o diretório temporário
	@tar -xzf "$(PACKAGE)" -C "$(TMP_DIR)" # Extrai TODO o pacote para o TMP_DIR

	@echo "🔧 Locating and copying correct build..."
	@mkdir -p "$(PHP_MODULES_DIR)"
	@sh -c 'SRC_FILE=$$(find "$(TMP_DIR)/bin" -type f -path "*/php-$(PHP_MAJOR_MINOR)*/*.so" | head -n 1); \
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

# O target 'all' agora depende de 'prepare' para garantir que o .so esteja no lugar.
all: prepare
	@echo "📦 .so is ready in $(PHP_MODULES_DIR)/"

clean:
	@echo "🧹 Cleaning temporary files..."
	@rm -rf $(TMP_DIR)
	@rm -f $(PHP_MODULES_DIR)/$(EXTENSION_NAME).so
	@echo "✅ Done."

SHLIB_NAME = $(EXTENSION_NAME).so
SHARED_LIB = $(PHP_MODULES_DIR)/$(SHLIB_NAME)