/* {{{
 * =============================================================================
 *      Filename    :   ex_file.c
 *      Description :
 *      Created     :   2015-08-23 16:08:12
 *      Author      :   Wu Hong
 * =============================================================================
 }}} */

#include <unistd.h>
#include <errno.h>
#include <stdlib.h>
#include <string.h>

#ifdef _WIN32
#define PATH_SEPARATOR   '\\'
#else
#define PATH_SEPARATOR   '/'
#endif

