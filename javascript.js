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

        const sleepPointsMap24 = { 2: 12, 3: 8, 4: 4 }

        function calc24(sleep24) {
            return sleepPointsMap24[sleep24] ?? 0
        }

        const points24 = calc24(sleep24)

        const sleepPointsMap48 = { 8: 8, 9: 6, 10: 4, 11: 2 }

        const points48 = calc48(sleep48)

        function calc48(sleep48) {
            return sleepPointsMap48[sleep48] ?? 0
        }
        // calculate points of 48

        const step3_hours = sinceLastSleep(hours_since_int, sleep48)
        function sinceLastSleep(hours_since_int, sleep48) {
            return hours_since_int - sleep48 < 0 ? 0 : hours_since_int - sleep48
            condition ? valueIfTrue : valueIfFalse

            // resetting hours points.
            if (step3_hours < 0) {
                step3_hours = 0
            }

            return hours_since_int - sleep48
        }

        // calculate points of hours since
        // step3_hours = hours_since_int - sleep48

        // calculate hours
        result = points24 + points48 + step3_hours

        // Calculating points score

        const text_result = determineTextResult(result)
        function determineTextResult(result) {
            if (result <= 5) {
                return 'Self-monitor'
            } else if (result <= 10 && result >= 6) {
                return 'Notify SMOPS / Peer Monitoring'
            } else {
                return 'Do not commence work until fit for duty'
            }
        }

        // create element for display
        const p = document.createElement('p')
        p.className = 'resultContainer' // sets the class

        p.innerHTML = `<div>   <strong>Result </strong> </div>

<div class="resultText"> ${result} points. ${text_result}</div>

<div class="resultText"> <strong>Summary</strong> </div><div class="resultText">- ${sleep24} hours sleep in prior 24 hours (${points24} points) </div><div class="resultText">- ${sleep48} hours sleep in prior 48 hours (${points48} points)</div><div class="resultText" >- ${hours_since_int} hours awake since last sleep (${step3_hours} hours awake greater than the ${sleep48} hours sleep in the prior 48 hours - ${step3_hours} points)</div>
`
        // Display new element
        document.querySelector('#result').innerHTML = ''
        document.querySelector('#result').append(p)
        return false
    }
})
