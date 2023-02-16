import { Countdown as CountdownController } from './CountdownConfig'
import { useState, useEffect } from 'react'
import style from './style.css'

function Countdown() {
  const [isReset, setIsReset] = useState(false)

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded) {
      const container = document.getElementById('timer')
      const tempController = new CountdownController(style, container, isReset)
      setLoaded(true)
      tempController.reset(isReset)
      tempController.init()
    }
  }, [loaded])

  return (
    <div className="countdownContainer" id="timer">
      <div className="countdown" aria-hidden="true" role="presentation">
        <div className="unitWrapper">
          <div className="digit js-digit" data-unit="days" data-max-number="nine" />
          <div className="digit js-digit" data-unit="days" data-max-number="nine" />
          <span className="unitLabel">D</span>
        </div>
        <div className="unitWrapper">
          <div className="digit js-digit" data-unit="hours" data-max-number="two" />
          <div className="digit js-digit" data-unit="hours" data-max-number="nine" />
          <span className="unitLabel">H</span>
        </div>
        <div className="unitWrapper">
          <div
            className="digit js-digit"
            data-unit="minutes"
            data-max-number="five"
          />
          <div
            className="digit js-digit"
            data-unit="minutes"
            data-max-number="nine"
          />
          <span className="unitLabel">M</span>
        </div>
        <div className="unitWrapper">
          <div
            className="digit js-digit"
            data-unit="seconds"
            data-max-number="five"
          />
          <div
            className="digit js-digit"
            data-unit="seconds"
            data-max-number="nine"
          />
          <span className="unitLabel">S</span>
        </div>
      </div>
    </div>
  )
}

export default Countdown
