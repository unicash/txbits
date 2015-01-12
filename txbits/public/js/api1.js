var API;
(function(){
    // when you call API wrap on a function it returns a function which
    // when called acts just like the function you wrapped but also adds
    // an error handler
    var APIWrap = function(fn) {
        return function () {
            return fn.apply(this, arguments).error( function (res) {
                var err_text = '';
                try {
                    err_text = JSON.parse(res.responseText).message
                } catch (e) {
                    err_text = res.responseText;
                }
                $.pnotify({
                    title: 'API Error',
                    text: err_text,
                    styling: 'bootstrap',
                    type: 'error',
                    text_escape: true
                });
            });
        };
    };
    API = {
        balance: APIWrap(function() {
            return $.get('/api/1/balance', 'json');
        }),

        pending_withdrawals: APIWrap(function(){
            return $.get('/api/1/pending_withdrawals_all', 'json')
        }),

        pending_deposits: APIWrap(function(){
            return $.get('/api/1/pending_deposits_all', 'json')
        }),

        bid: APIWrap(function(base, counter, amount, price) {
            return $.ajax('/api/1/bid', {
                type: 'POST',
                data: JSON.stringify({base: base, counter: counter, amount: amount, price: price}),
                dataType: 'json',
                contentType: 'application/json'
            });
        }),

        ask: APIWrap(function(base, counter, amount, price) {
            return $.ajax('/api/1/ask', {
                type: 'POST',
                data: JSON.stringify({base: base, counter: counter, amount: amount, price: price}),
                dataType: 'json',
                contentType: 'application/json'
            });
        }),

        cancel: APIWrap(function(id) {
            return $.ajax('/api/1/cancel', {
                type: 'POST',
                data: JSON.stringify({order: Number(id)}),
                dataType: 'json',
                contentType: 'application/json'
            });
        }),

        withdraw: APIWrap(function(currency, amount, address, tfa_code) {
            return $.ajax('/api/1/withdraw', {
                type: 'POST',
                data: JSON.stringify({currency: currency, amount: amount, address: address, tfa_code: tfa_code}),
                dataType: 'json',
                contentType: 'application/json'
            });
        }),

        pairs: APIWrap(function() {
            return $.get('/api/1/pairs', 'json');
        }),

        currencies: APIWrap(function() {
            return $.get('/api/1/currencies', 'json');
        }),

        deposit_crypto: APIWrap(function(currency) {
            return $.get('/api/1/deposit_crypto/'+currency, 'json');
        }),

        deposit_crypto_all: APIWrap(function() {
            return $.get('/api/1/deposit_crypto_all', 'json');
        }),

        ticker: APIWrap(function() {
            return $.get('/api/1/ticker', 'json');
        }),

        trade_history: APIWrap(function() {
            return $.get('/api/1/trade_history', 'json');
        }),

        login_history: APIWrap(function() {
            return $.get('/api/1/login_history', 'json');
        }),

        deposit_withdraw_history: APIWrap(function() {
            return $.get('/api/1/deposit_withdraw_history', 'json');
        }),

        pending_trades: APIWrap(function() {
            return $.get('/api/1/pending_trades', 'json');
        }),

        trade_fees: APIWrap(function() {
            return $.get('/api/1/trade_fees', 'json');
        }),

        dw_fees: APIWrap(function() {
            return $.get('/api/1/dw_fees', 'json');
        }),

        dw_limits: APIWrap(function() {
            return $.get('/api/1/dw_limits', 'json');
        }),

        required_confirms: APIWrap(function() {
            return $.get('/api/1/required_confirms', 'json');
        }),

        open_trades: APIWrap(function(first, second) {
            return $.get('/api/1/open_trades/'+first+'/'+second, 'json');
        }),

        recent_trades: APIWrap(function(first, second) {
            return $.get('/api/1/recent_trades/'+first+'/'+second, 'json');
        }),

        user: APIWrap(function() {
            return $.get('/api/1/user', 'json');
        }),

        turnoff_tfa: APIWrap(function(code, password) {
            return $.ajax('/api/1/turnoff_tfa', {
                type: 'POST',
                data: JSON.stringify({tfa_code: code, password: password}),
                dataType: 'json',
                contentType: 'application/json'
            });
        }),

        turnoff_emails: APIWrap(function() {
            return $.ajax('/api/1/turnoff_emails', {
                type: 'POST',
                data: "{}",
                dataType: 'json',
                contentType: 'application/json'
            });
        }),

        turnon_emails: APIWrap(function() {
            return $.ajax('/api/1/turnon_emails', {
                type: 'POST',
                data: "{}",
                dataType: 'json',
                contentType: 'application/json'
            });
        }),

        gen_totp_secret: APIWrap(function() {
            return $.post('/api/1/gen_totp_secret', 'json');
        }),

        turnon_tfa: APIWrap(function(code, password) {
            return $.ajax('/api/1/turnon_tfa', {
                type: 'POST',
                data: JSON.stringify({tfa_code: code, password: password}),
                dataType: 'json',
                contentType: 'application/json'
            });
        }),

        add_pgp: APIWrap(function(password, code, pgp) {
            return $.ajax('/api/1/add_pgp', {
                type: 'POST',
                data: JSON.stringify({tfa_code: code, password: password, pgp: pgp}),
                dataType: 'json',
                contentType: 'application/json'
            });
        }),

        remove_pgp: APIWrap(function(password, code) {
            return $.ajax('/api/1/remove_pgp', {
                type: 'POST',
                data: JSON.stringify({tfa_code: code, password: password}),
                dataType: 'json',
                contentType: 'application/json'
            });
        }),

        add_api_key: APIWrap(function() {
            return $.ajax('/api/1/add_api_key', {
                type: 'POST',
                data: "{}",
                dataType: 'json',
                contentType: 'application/json'
            });
        }),

        update_api_key: APIWrap(function(code, api_key, trading, trade_history, list_balance) {
            return $.ajax('/api/1/update_api_key', {
                type: 'POST',
                data: JSON.stringify({tfa_code: code, api_key: api_key, trading: trading, trade_history: trade_history, list_balance: list_balance}),
                dataType: 'json',
                contentType: 'application/json'
            });
        }),

        disable_api_key: APIWrap(function(code, api_key) {
            return $.ajax('/api/1/disable_api_key', {
                type: 'POST',
                data: JSON.stringify({tfa_code: code, api_key: api_key}),
                dataType: 'json',
                contentType: 'application/json'
            });
        }),

        get_api_keys: APIWrap(function() {
            return $.get('/api/1/get_api_keys', 'json');
        }),

        chart: APIWrap(function(base, counter) {
            return $.get('/api/1/chart/'+base+'/'+counter, 'json');
        })
    };
})();