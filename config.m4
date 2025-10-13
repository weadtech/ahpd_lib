dnl Define o nome do módulo e a flag de ativação
PHP_ARG_ENABLE(ahpd, whether to enable ahpd support,
[  --enable-ahpd   Enable AHPD extension support], no)

dnl Se você deseja que a extensão seja sempre "instalável", use:
PHP_ADD_MAKEFILE_FRAGMENT

dnl Ou, se você quer que o PIE a habilite:
if test "$PHP_AHPD" != "no"; then
    dnl O PIE espera que algumas variáveis sejam definidas. Use a macro para isso.
    dnl O primeiro argumento é o nome do módulo. O segundo é a lista de arquivos .c (vazio).
    PHP_NEW_EXTENSION(ahpd, , \$ext_shared, -DZEND_ENABLE_STATIC_TSRMLS_CACHE=1)
    
    dnl Adiciona o fragmento.
    PHP_ADD_MAKEFILE_FRAGMENT
fi