"use strict";
var KTCreateAccount = function() {
    var e, t, i, o, a, r, s = [];
    return {
        init: function() {
            (e = document.querySelector("#kt_modal_create_account")) && new bootstrap.Modal(e),
            (t = document.querySelector("#kt_create_account_stepper")) && (i = t.querySelector("#kt_create_account_form"),
            o = t.querySelector('[data-kt-stepper-action="submit"]'),
            a = t.querySelector('[data-kt-stepper-action="next"]'),
            (r = new KTStepper(t)).on("kt.stepper.changed", (function(e) {
                2 === r.getCurrentStepIndex() ? (o.classList.remove("d-none"),
                o.classList.add("d-inline-block"),
                a.classList.add("d-none")) : 3 === r.getCurrentStepIndex() ? (o.classList.add("d-none"),
                a.classList.add("d-none")) : (o.classList.remove("d-inline-block"),
                o.classList.remove("d-none"),
                a.classList.remove("d-none"))
            }
            )),
            r.on("kt.stepper.next", (function(e) {
                console.log("stepper.next");
                var t = s[e.getCurrentStepIndex() - 1];
                t ? t.validate().then((function(t) {
                    console.log("validated!"),
                    "Valid" == t ? (e.goNext(),
                    KTUtil.scrollTop()) : Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-light"
                        }
                    }).then((function() {
                        KTUtil.scrollTop()
                    }
                    ))
                }
                )) : (e.goNext(),
                KTUtil.scrollTop())
            }
            )),
            r.on("kt.stepper.previous", (function(e) {
                console.log("stepper.previous"),
                e.goPrevious(),
                KTUtil.scrollTop()
            }
            )),
            s.push(FormValidation.formValidation(i, {
                fields: {
                    account_type: {
                        validators: {
                            notEmpty: {
                                message: "Account type is required"
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })),
            s.push(FormValidation.formValidation(i, {
                fields: {
                    first_name: {
                        validators: {
                            notEmpty: {
                                message: "First Name is required"
                            }
                        }
                    },
                    last_name: {
                        validators: {
                            notEmpty: {
                                message: "Last Name is required"
                            }
                        }
                    },
                    email: {
                        validators: {
                            regexp: {
                                regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "The value is not a valid email address"
                            },
                            notEmpty: {
                                message: "Email address is required"
                            }
                        }
                    },
                    phone: {
                        validators: {
                            regexp: {
                                regexp: /^([+]{1})([0-9]{1,3})([0-9]{9,10})$/,
                                message: "The value is not a valid phone number"
                            },
                            notEmpty: {
                                message: "Phone number is required"
                            }
                        }
                    },
                    password: {
                        validators: {
                            notEmpty: {
                                message: "The password is required"
                            },
                            callback: {
                                message: "Please enter valid password",
                                callback: function(e) {
                                    if (e.value.length > 0)
                                        return s()
                                }
                            }
                        }
                    },
                    "confirm-password": {
                        validators: {
                            notEmpty: {
                                message: "The password confirmation is required"
                            },
                            identical: {
                                compare: function() {
                                    return document.querySelector('[name="password"]').value
                                },
                                message: "The password and its confirm are not the same"
                            }
                        }
                    },
                    toc: {
                        validators: {
                            notEmpty: {
                                message: "You must accept the terms and conditions"
                            }
                        }
                    },
                    account_name: {
                        validators: {
                            notEmpty: {
                                message: "Creator/Agency name is required"
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })),
            o.addEventListener("click", (function(e) {
                s[1].validate().then((function(t) {
                    console.log("validated!"),
                    "Valid" == t ? (e.preventDefault(),
                    o.disabled = !0,
                    o.setAttribute("data-kt-indicator", "on"),
                    setTimeout((function() {
                        o.removeAttribute("data-kt-indicator"),
                        o.disabled = !1,
                        r.goNext()
                    }
                    ), 2e3)) : Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-light"
                        }
                    }).then((function() {
                        KTUtil.scrollTop()
                    }
                    ))
                }
                ))
            }
            )))
        }
    }
}();
KTUtil.onDOMContentLoaded((function() {
    KTCreateAccount.init()
}
));