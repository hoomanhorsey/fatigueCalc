document.addEventListener('DOMContentLoaded', function () {
    // Sleep in prior 24 hours calculation

    // Listen for submission of form
    document.querySelector('#sleep_form').onsubmit = () => {
        // get value of hours slept in 24
        const sleep24_string = document.querySelector('#sleep_24_option').value
        const sleep24 = parseInt(sleep24_string)

        // get value of hours slept in 48
        const sleep48_string = parseInt(
            document.querySelector('#sleep_48_option').value
        )
        const sleep48 = parseInt(sleep48_string)

        // hours since last sleep
        const hours_since = document.querySelector('#hours_since').value
        const hours_since_int = parseInt(hours_since)

        // calculate points

        // calculate points of 24

        if (sleep24 === 2) {
            points24 = 12
        } else if (sleep24 === 3) {
            points24 = 8
        } else if (sleep24 === 4) {
            points24 = 4
        } else {
            points24 = 0
        }

        // calculate points of 48
        if (sleep48 === 8) {
            points48 = 8
        } else if (sleep48 === 9) {
            points48 = 6
        } else if (sleep48 === 10) {
            points48 = 4
        } else if (sleep48 === 11) {
            points48 = 2
        } else {
            points48 = 0
        }
        // calculate points of hours since
        step3_hours = hours_since_int - sleep48

        // resetting hours points.
        if (step3_hours < 0) {
            step3_hours = 0
        }

        // calculate hours
        result = points24 + points48 + step3_hours

        // Calculating points score
        if (result <= 5) {
            text_result = 'Self-monitor'
        } else if (result <= 10 && result >= 6) {
            text_result = 'Notify SMOPS / Peer Monitoring'
        } else {
            text_result = 'Do not commence work until fit for duty'
        }

        // create element for display
        const p = document.createElement('p')
        p.className = 'resultText' // sets the class

        p.innerHTML = `<div class="resultsContainer">
        <div>   <strong>Result </strong> </div>

<div class="resultText"> ${result} points. ${text_result}</div>

<div class="resultSummary"> <strong>Summary:</strong> </div>
<div> - ${sleep24} hours sleep in prior 24 hours (${points24} points) </div>
<div> - ${sleep48} hours sleep in prior 48 hours (${points48} points)</div>
<div> - ${hours_since_int} hours awake since last sleep (${step3_hours} hours awake greater than the ${sleep48} hours sleep in the prior 48 hours - ${step3_hours} points)</div>`

        // q.innerHTML =
        //     '<strong>' +
        //     text_result +
        //     '</strong><br><br> Total of <strong>' +
        //     result +
        //     ' </strong> points ' +
        //     '<br><br> Summary: <br><strong>' +
        //     sleep24 +
        //     ' </strong> hours sleep in prior 24 hours, which gives ' +
        //     points24 +
        //     ' points <br> <strong>' +
        //     sleep48 +
        //     ' </strong> hours sleep in prior 48 hours, which gives ' +
        //     points48 +
        //     ' points <br> <strong>' +
        //     hours_since_int +
        //     ' </strong> hours awake since last sleep, which is ' +
        //     step3_hours +
        //     ' hours awake greater than the ' +
        //     sleep48 +
        //     ' hours sleep in the prior 48 hours, which gives ' +
        //     step3_hours +
        //     ' points'

        // Display new element
        document.querySelector('#result').innerHTML = ''
        document.querySelector('#result').append(p)
        return false
    }
})
