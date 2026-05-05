$(document).ready(function () {

    $('.detail-check').change(function () {
        let detailsRow = $(this).closest('tr').next('.details-row');

        if (this.checked) {
            detailsRow.show();
        } else {
            detailsRow.hide();
        }
    });

    $('#continueBtn').click(function () {
        if ($('.select-meal:checked').length > 0) {
            $('#orderFormContainer').fadeIn();
        } else {
            alert("يرجى اختيار وجبة أولاً");
        }
    });

    $('#deliveryForm').submit(function (e) {
        e.preventDefault();

        let name = $('#fullName').val();
        let account = $('#bankAccount').val();
        let mobile = $('#mobileNumber').val();
        let date = $('#orderDate').val();

        let nameRegex = /^[A-Za-z\s]+$/;
        let accountRegex = /^\d{6}$/;
        let mobileRegex = /^09\d{8}$/;
        let dateRegex = /^\d{2}-\d{2}-\d{4}$/;

        if (!nameRegex.test(name)) {
            alert("الاسم يجب أن يكون بالإنكليزية");
            return;
        }

        if (!accountRegex.test(account)) {
            alert("رقم الحساب يجب أن يكون 6 أرقام");
            return;
        }

        if (mobile && !mobileRegex.test(mobile)) {
            alert("رقم الموبايل غير صحيح");
            return;
        }

        if (date && !dateRegex.test(date)) {
            alert("التاريخ غير صحيح");
            return;
        }

        let total = 0;

        $('.select-meal:checked').each(function () {
            let price = parseInt($(this).closest('tr').find('td:eq(2)').text());
            total += price;
        });

        let tax = total * 0.10;
        let finalTotal = total - tax;

        alert(
            "المجموع: " + total +
            "\nالضريبة: " + tax +
            "\nالصافي: " + finalTotal
        );

        this.reset();
        $('#orderFormContainer').hide();
    });

});