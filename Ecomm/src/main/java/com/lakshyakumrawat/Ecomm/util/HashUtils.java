package com.lakshyakumrawat.Ecomm.util;

import org.mindrot.jbcrypt.BCrypt;

public class HashUtils {

    /**
     * Hashes the input password using BCrypt with a secure salt.
     * Used for secure password storage in the database.
     */
    public static String hashPassword(String password) {
        if (password == null) {
            return null;
        }
        return BCrypt.hashpw(password, BCrypt.gensalt(12));
    }

    /**
     * Verifies a plaintext password against a stored BCrypt hash.
     */
    public static boolean checkPassword(String plaintextPassword, String hashedPassword) {
        if (plaintextPassword == null || hashedPassword == null) {
            return false;
        }
        try {
            return BCrypt.checkpw(plaintextPassword, hashedPassword);
        } catch (IllegalArgumentException e) {
            // In case there is an old non-BCrypt format hash in the database, catch error
            return false;
        }
    }
}
