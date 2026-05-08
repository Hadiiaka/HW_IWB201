$(document).ready(function () {

    $('.detail-check').on('change', function () {
        let detailsRow = $(this).closest('tr').next('.details-row');
        if (this.checked) {
            detailsRow.fadeIn();
        } else {
            detailsRow.fadeOut();
        }
    });

    $('#continueBtn').on('click', function () {
        if ($('.select-meal:checked').length > 0) {
            $('#orderFormContainer').fadeIn();
            $('html, body').animate({ scrollTop: $("#orderFormContainer").offset().top }, 800);
        } else {
            alert("يرجى اختيار وجبة واحدة على الأقل للمتابعة");
        }
    });

    $('#deliveryForm').on('submit', function (e) {
        e.preventDefault();

        let nameRegex = /^[A-Za-z\s]+$/;
        let accountRegex = /^\d{6}$/;
        let mobileRegex = /^09\d{8}$/;
        let dateRegex = /^\d{2}-\d{2}-\d{4}$/;

        if (!nameRegex.test($('#fullName').val())) { alert("الاسم يجب أن يكون باللغة الإنكليزية فقط"); return; }
        if (!accountRegex.test($('#bankAccount').val())) { alert("رقم الحساب يجب أن يتكون من 6 أرقام"); return; }
        if (!mobileRegex.test($('#mobileNumber').val())) { alert("رقم الموبايل يجب أن يبدأ بـ 09 ويتكون من 10 أرقام"); return; }
        if (!dateRegex.test($('#orderDate').val())) { alert("التاريخ يجب أن يكون بصيغة dd-mm-yyyy"); return; }

        let total = 0;
        $('.select-meal:checked').each(function () {
            let price = parseInt($(this).closest('tr').find('td:eq(2)').text());
            total += price;
        });

        let tax = total * 0.10;
        let finalTotal = total + tax;

        alert(
            "تم استلام طلبك بنجاح!\n\n" +
            "مجموع الوجبات: " + total.toLocaleString() + " ل.س\n" +
            "الضريبة (10%): " + tax.toLocaleString() + " ل.س\n" +
            "الإجمالي النهائي: " + finalTotal.toLocaleString() + " ل.س"
        );

        this.reset();
        $('#orderFormContainer').hide();
        $('.select-meal, .detail-check').prop('checked', false);
        $('.details-row').hide();
    });
});
