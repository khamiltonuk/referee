"use strict";

var captureArgs = require("../test-helper/capture-args");
var referee = require("../referee");
var assert = require("assert");

var obj = { id: 42 };
var func = function() {};
var arr = [];
var date = new Date();
var sameDate = new Date(date.getTime());
var anotherDate = new Date(date.getTime() - 10);

describe("assert.equals", function() {
    it("should pass when comparing object with itself", function() {
        referee.assert.equals(obj, obj);
    });

    it("should pass when comparing strings", function() {
        referee.assert.equals("Hey", "Hey");
    });

    it("should fail for multi-line strings with more than one newline", function() {
        assert.throws(
            function() {
                referee.assert.equals("Yo!\nMulti-\nline", "Yo!\nHey");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] Yo!\\nMulti-\\nline expected to be equal to Yo!\\nHey"
                );
                assert.equal(error.operator, "assert.equals");
                assert.equal(error.name, "AssertionError");
                return true;
            }
        );
    });

    it("should fail for multi-line strings", function() {
        assert.throws(
            function() {
                referee.assert.equals("Yo!\nMultiline", "Yo!\nHey");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] Yo!\\nMultiline expected to be equal to Yo!\\nHey"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    it("should pass when comparing numbers", function() {
        referee.assert.equals(32, 32);
    });

    it("should pass when comparing booleans", function() {
        referee.assert.equals(false, false);
    });

    it("should pass when comparing null", function() {
        referee.assert.equals(null, null);
    });

    it("should fail when comparing undefined", function() {
        assert.throws(
            function() {
                referee.assert.equals(undefined, undefined);
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] Expectation for equals should not be undefined. Use assert.defined or refute.defined instead."
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    it("should pass when comparing func to itself", function() {
        referee.assert.equals(func, func);
    });

    it("should fail when comparing functions", function() {
        assert.throws(
            function() {
                referee.assert.equals(function() {}, function() {});
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] function () {} expected to be equal to function () {}"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    it("should pass when comparing array to itself", function() {
        referee.assert.equals(arr, arr);
    });

    it("should pass when comparing date objects with same date", function() {
        referee.assert.equals(date, sameDate);
    });

    it("should fail when comparing date objects with different dates", function() {
        assert.throws(
            function() {
                referee.assert.equals(date, anotherDate);
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] " +
                        date +
                        " expected to be equal to " +
                        anotherDate
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });
    it("should fail when comparing date objects with null", function() {
        assert.throws(
            function() {
                referee.assert.equals(date, null);
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] " + date + " expected to be equal to null"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    it("should fail when comparing strings and numbers with coercion", function() {
        assert.throws(
            function() {
                referee.assert.equals("4", 4);
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] 4 expected to be equal to 4"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });
    it("should fail when comparing number and string with coercion", function() {
        assert.throws(
            function() {
                referee.assert.equals(4, "4");
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] 4 expected to be equal to 4"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    it("should fail when comparing number with number object with coercion", function() {
        assert.throws(
            function() {
                // eslint-disable-next-line no-new-wrappers
                referee.assert.equals(32, new Number(32));
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] 32 expected to be equal to 32"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    it("should fail when comparing number object with number with coercion", function() {
        assert.throws(
            function() {
                // eslint-disable-next-line no-new-wrappers
                referee.assert.equals(new Number(32), 32);
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] 32 expected to be equal to 32"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    it("should fail when comparing falsy value with coercion", function() {
        assert.throws(
            function() {
                referee.assert.equals(0, "");
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] 0 expected to be equal to (empty string)"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    it("should fail when comparing falsy value reverse with coercion", function() {
        assert.throws(
            function() {
                referee.assert.equals("", 0);
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] (empty string) expected to be equal to 0"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    it("should fail when comparing string boxing with coercion", function() {
        assert.throws(
            function() {
                // eslint-disable-next-line no-new-wrappers
                referee.assert.equals("4", new String("4"));
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] 4 expected to be equal to 4"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    it("should fail when comparing string boxing reverse with coercion", function() {
        assert.throws(
            function() {
                // eslint-disable-next-line no-new-wrappers
                referee.assert.equals(new String("4"), "4");
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] 4 expected to be equal to 4"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    it("should pass when comparing NaN to NaN", function() {
        referee.assert.equals(NaN, NaN);
    });

    it("should fail when comparing -0 and +0", function() {
        assert.throws(
            function() {
                referee.assert.equals(-0, +0);
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] -0 expected to be equal to 0"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    it("should fail when comparing objects with different own properties", function() {
        assert.throws(
            function() {
                referee.assert.equals({ id: 42 }, { id: 42, di: 24 });
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] { id: 42 } expected to be equal to { di: 24, id: 42 }"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    it("should fail when comparing objects with different own properties #2", function() {
        assert.throws(
            function() {
                referee.assert.equals({ id: undefined }, { di: 24 });
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] { id: undefined } expected to be equal to { di: 24 }"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    it("should pass when comparing with one property", function() {
        referee.assert.equals({ id: 42 }, { id: 42 });
    });
    it("should pass when comparing objects with one property", function() {
        referee.assert.equals({ obj: { id: 42 } }, { obj: { id: 42 } });
    });

    it("should fail when comparing objects with one property with different values", function() {
        assert.throws(
            function() {
                referee.assert.equals({ id: 42 }, { id: 24 });
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] { id: 42 } expected to be equal to { id: 24 }"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    var deepObject = {
        id: 42,
        name: "Hey",
        sayIt: function() {
            return this.name;
        },

        child: {
            speaking: function() {}
        }
    };

    it("should pass when comparing complex objects", function() {
        referee.assert.equals(deepObject, {
            sayIt: deepObject.sayIt,
            child: { speaking: deepObject.child.speaking },
            id: 42,
            name: "Hey"
        });
    });

    it("should pass when comparing arrays", function() {
        referee.assert.equals(
            [1, 2, "Hey there", func, { id: 42, prop: [2, 3] }],
            [1, 2, "Hey there", func, { id: 42, prop: [2, 3] }]
        );
    });

    it("should pass when comparing regexp literals", function() {
        referee.assert.equals(/a/, /a/);
    });

    it("should pass when comparing regexp objects ", function() {
        referee.assert.equals(new RegExp("[a-z]+"), new RegExp("[a-z]+"));
    });

    it("should fail when comparing nested array with shallow array", function() {
        assert.throws(
            function() {
                referee.assert.equals([["hey"]], ["hey"]);
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    '[assert.equals] [["hey"]] expected to be equal to ["hey"]'
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    var re1 = new RegExp("[a-z]+");
    var re2 = new RegExp("[a-z]+");
    re2.id = 42;

    it("should fail when comparing regexp objects with custom properties", function() {
        assert.throws(
            function() {
                referee.assert.equals(re1, re2);
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] /[a-z]+/ expected to be equal to /[a-z]+/"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });
    it("should fail when comparing different objects", function() {
        assert.throws(
            function() {
                referee.assert.equals({ id: 42 }, {});
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] { id: 42 } expected to be equal to {  }"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });
    it("should fail when comparing object to null", function() {
        assert.throws(
            function() {
                referee.assert.equals({}, null);
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] {  } expected to be equal to null"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });
    it("should fail when comparing object to undefined", function() {
        assert.throws(
            function() {
                referee.assert.equals({}, undefined);
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] Expectation for equals should not be undefined. Use assert.defined or refute.defined instead."
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });
    it("should fail when comparing object to false", function() {
        assert.throws(
            function() {
                referee.assert.equals({}, false);
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] {  } expected to be equal to false"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });
    it("should fail when comparing false to object", function() {
        assert.throws(
            function() {
                referee.assert.equals(false, {});
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] false expected to be equal to {  }"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });
    it("should fail when comparing object to true", function() {
        assert.throws(
            function() {
                referee.assert.equals({}, true);
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] {  } expected to be equal to true"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });
    it("should fail when comparing true to object", function() {
        assert.throws(
            function() {
                referee.assert.equals(true, {});
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] true expected to be equal to {  }"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });
    it("should fail when comparing 'empty' object to date", function() {
        assert.throws(
            function() {
                referee.assert.equals({}, new Date());
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] {  } expected to be equal to " + new Date()
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    it("should fail when comparing 'empty' object to string object", function() {
        assert.throws(
            function() {
                // eslint-disable-next-line no-new-wrappers
                referee.assert.equals({}, new String());
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] {  } expected to be equal to "
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    it("should fail when comparing 'empty' object to number object", function() {
        assert.throws(
            function() {
                // eslint-disable-next-line no-new-wrappers
                referee.assert.equals({}, new Number());
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] {  } expected to be equal to 0"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    it("should fail when comparing 'empty' object to empty array", function() {
        assert.throws(
            function() {
                // eslint-disable-next-line no-new-wrappers
                referee.assert.equals({}, []);
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] {  } expected to be equal to []"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    var arrayLike = { length: 4, "0": 1, "1": 2, "2": {}, "3": [] };

    it("should pass when comparing empty arguments to empty array", function() {
        referee.assert.equals(captureArgs(), []);
    });

    it("should fail when comparing empty array to empty arguments", function() {
        assert.throws(
            function() {
                // eslint-disable-next-line no-new-wrappers
                referee.assert.equals([], captureArgs());
            },
            function(error) {
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.equals] [] expected to be equal to {  }"
                );
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });

    it("should pass when comparing arguments with elements to array with equal elements", function() {
        referee.assert.equals(captureArgs(1, 2, {}, []), [1, 2, {}, []]);
    });

    it("should pass when comparing arguments to array like object", function() {
        referee.assert.equals(captureArgs(1, 2, {}, []), arrayLike);
    });

    it("should fail with custom message", function() {
        assert.throws(
            function() {
                referee.assert.equals({}, "Hey", "Here:");
            },
            function(error) {
                assert.equal(
                    error.message,
                    "[assert.equals] Here: {  } expected to be equal to Hey"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(error.operator, "assert.equals");
                return true;
            }
        );
    });
});
