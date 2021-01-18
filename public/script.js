$(document).ready(function() {
    $('#signup').submit(async function(e) {
        e.preventDefault();

        //reset errors
        $('.name-error').text('');
        $('.email-error').text('');
        $('.password-error').text('');

        const name = this.name.value;
        const email = this.email.value;
        const password = this.password.value;
        
        // sending user data to server
        try {
            const user = await fetch('/signup', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: { 
                    'Content-Type': 'application/json'
                }
            });
            const data = await user.json();

            // show errors
            if(data.errors) {
                $('.name-error').text(data.errors.name);
                $('.email-error').text(data.errors.email);
                $('.password-error').text(data.errors.password);
            }

            // redirect to home page if successfull
            if(data.user) {
                location.assign('/');
            }
        }
        catch(err) {
            console.log(err);
        }
    });

    $('#login').submit(async function(e) {
        e.preventDefault();

        //reset errors
        $('.email-error').text('');
        $('.password-error').text('');

        // fetchin form values
        const email = this.email.value;
        const password = this.password.value;
        
        // sending user data to server
        try {
            const res = await fetch('/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();

            // show errors
            if(data.errors) {
                $('.email-error').text(data.errors.email);
                $('.password-error').text(data.errors.password);
            }

            // redirect to home page if successfull
            if(data.user) {
                location.assign('/');
            }
        }
        catch(err) {
            console.log(err);
        }
    });

    // $('#customStocksForm').submit(function(e) {
    //     e.preventDefault();

        // let selectedStocks = [];
        // $.each($("input[type='checkbox']:checked"), function(){
        //     selectedStocks.push($(this).val());
        // });
        // alert("My favourite sports are: " + selectedStocks.join(", "));
    
        // try {
        //     const res = await fetch('/input/custom', {
        //         method: 'POST',
        //         body: JSON.stringify({ type: 'hello' }),
        //         headers: { 'Content-Type': 'application/json' }
        //     });
        //     const data = await res.json();

        //     if(data.success)
        //         location.assign('/');
        // }
        // catch(err) {
        //     console.log(err);
    //     // }
    // });

    // $('#errorModal').modal(options)
});