package com.noahele.mangaserver.utils;

public class NaturalOrder {
    private NaturalOrder() {
    }

    public static int compare(String s1, String s2) {
        int i1 = 0, i2 = 0;
        int nz1, nz2;
        char c1, c2;

        while (true) {
            // only count the number of zeroes leading the last number compared
            nz1 = 0;
            nz2 = 0;

            c1 = charAt(s1, i1);
            c2 = charAt(s2, i2);

            // skip over leading spaces or zeros
            while (Character.isSpaceChar(c1) || c1 == '0') {
                if (c1 == '0') {
                    nz1++;
                } else {
                    // only count consecutive zeroes
                    nz1 = 0;
                }
                c1 = charAt(s1, ++i1);
            }

            while (Character.isSpaceChar(c2) || c2 == '0') {
                if (c2 == '0') {
                    nz2++;
                } else {
                    // only count consecutive zeroes
                    nz2 = 0;
                }
                c2 = charAt(s2, ++i2);
            }

            // process run of digits
            if (Character.isDigit(c1) && Character.isDigit(c2)) {
                int temp = compareRight(s1.substring(i1), s2.substring(i2));
                if (temp != 0) {
                    return temp;
                }
            }

            if (c1 == 0 && c2 == 0) {
                return nz1 - nz2;
            }
            if (c1 < c2) {
                return -1;
            }
            if (c1 > c2) {
                return 1;
            }

            i1++;
            i2++;
        }
    }

    private static int compareRight(String s1, String s2) {
        int temp = 0, i1 = 0, i2 = 0;

        while (true) {
            char c1 = charAt(s1, i1);
            char c2 = charAt(s2, i2);

            if (!Character.isDigit(c1) && !Character.isDigit(c2)) {
                return temp;
            }
            if (!Character.isDigit(c1)) {
                return -1;
            }
            if (!Character.isDigit(c2)) {
                return +1;
            }
            if (c1 == 0 && c2 == 0) {
                return temp;
            }

            if (temp == 0) {
                if (c1 < c2) {
                    temp = -1;
                } else if (c1 > c2) {
                    temp = 1;
                }
            }

            i1++;
            i2++;
        }
    }

    private static char charAt(String s, int i) {
        return i >= s.length() ? 0 : s.charAt(i);
    }
}
