#ifndef EX_FILE_H_201508231608
#define EX_FILE_H_201508231608
#ifdef __cplusplus
extern "C" {
#endif

/* {{{
 * =============================================================================
 *      Filename    :   ex_file.h
 *      Description :
 *      Created     :   2015-08-23 16:08:09
 *      Author      :   Wu Hong
 * =============================================================================
 }}} */

#include <sys/types.h>
#include <sys/stat.h>

int mkdirp(const char* path, mode_t mode);

#ifdef __cplusplus
}
#endif
#endif  /* EX_FILE_H_201508231608 */

