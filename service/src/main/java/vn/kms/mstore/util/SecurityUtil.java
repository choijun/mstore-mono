package vn.kms.mstore.util;

/**
 * Created by trungnguyen on 6/22/15.
 */
// Mock Security
public final class SecurityUtil {
    private static String loginId;

    public static String getLoginId() {
        return loginId;
    }

    public static void setLoginId(String loginId) {
        SecurityUtil.loginId = loginId;
    }

    private SecurityUtil() {
    }
}
