// IE 11 polyfills
import 'intersection-observer'
import 'custom-event-polyfill'

// IE 10 polyfills
import 'core-js/stable/weak-map'

import {
  YacCarousel,
} from '../../src'

import React, {useRef, useEffect} from 'react'
import ReactDOM from "react-dom"
import { ReactComponent as ReactCarousel } from "../../src/wrappers/react";


const Root: React.FC = () => {
  const carouselRef = useRef<InstanceType<typeof YacCarousel> | null>()

  useEffect(() => {
    if (!carouselRef.current) return
    carouselRef.current.refresh() // test
  }, [carouselRef.current])

  return <ReactCarousel className="carousel flex" carouselRef={carouselRef}>
    <div className="item">
      <p>some text</p>
      <a href="https://www.pokret.org/" target="_blank"><span>link</span></a>
      <a href="https://www.pokret.org/" target="_blank" style={{
          display: 'block'
        }} draggable="false">
        non-draggable text<br />
        <img src="https://via.placeholder.com/100x100/09f/fff?text=draggable" alt="draggable" width="100" height="100" style={{
          display: 'block'
        }} />
      </a>
      <input type="text" value="test test" />
    </div>
    <div className="item">2 2</div>
    <div className="item">3</div>
    <div className="item">4</div>
    <div className="item">5<button>test1</button></div>
    <div className="item">6</div>
    <div className="item">7</div>
    <div className="item">8</div>
    <div className="item">9<button>test2</button></div>
    <div className="item">10</div>
    <div className="item">11</div>
  </ReactCarousel>
}

ReactDOM.render(<Root />, document.body)
