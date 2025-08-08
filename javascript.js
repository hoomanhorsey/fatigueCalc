document.addEventListener('DOMContentLoaded', function () {
    // Sleep in prior 24 hours calculation

    const sleepPointsMap24 = { 2: 12, 3: 8, 4: 4 }
    const sleepPointsMap48 = { 8: 8, 9: 6, 10: 4, 11: 2 }

    function getSleepFormValues() {
        console.log(document.querySelector('#hours_since').value)
        return {
            sleep24: parseInt(document.querySelector('#sleep_24_option').value),
            sleep48: parseInt(document.querySelector('#sleep_48_option').value),
            hours_since: parseInt(document.querySelector('#hours_since').value),
        }
    }

    function calc24(sleep24) {
        return sleepPointsMap24[sleep24] ?? 0
    }
    function calc48(sleep48) {
        return sleepPointsMap48[sleep48] ?? 0
    }

    function sinceLastSleep(hours_since, sleep48) {
        return hours_since - sleep48 < 0 ? 0 : hours_since - sleep48
    }

    function determineTextResult(result) {
        if (result <= 5) {
            return 'Self-monitor'
        } else if (result <= 10 && result >= 6) {
            return 'Notify SMOPS / Peer Monitoring'
        } else {
            return 'Do not commence work until fit for duty'
        }
    }

    // Listen for submission of form
    document.querySelector('#sleep_form').onsubmit = () => {
        const el = document.querySelector('.resultContainer')
        if (el) {
            el.remove()
        }

        // get sleep Form values
        const { sleep24, sleep48, hours_since } = getSleepFormValues()

        console.log(sleep24, sleep48, hours_since)

        // calculate points of 24
        const points24 = calc24(sleep24)
        // calculate points of 48
        const points48 = calc48(sleep48)
        // calculate points of hours since last sleep
        const step3_hours = sinceLastSleep(hours_since, sleep48)
        // calculate hours
        const result = points24 + points48 + step3_hours
        // Calculating points score
        const text_result = determineTextResult(result)

        // create element for display
        const p = document.createElement('p')
        p.className = 'resultContainer' // sets the class
        p.innerHTML = `<h3 class="resultText">Result</h3>

            <div class="resultText"> ${result} points. ${text_result}</div>

        <h3 class="resultText"> Summary</h3>
        
        <div class="resultText">${sleep24} hours sleep in prior 24 hours (${points24} points) 
        
        </div><div class="resultText">${sleep48} hours sleep in prior 48 hours (${points48} points)</div>
        
        <div class="resultText">${hours_since} hours awake since last sleep (${step3_hours} hours awake greater than the ${sleep48} hours sleep in the prior 48 hours - ${step3_hours} points)</div>
`
        // Display new element
        document.querySelector('.container').append(p)
        return false
    }
})
