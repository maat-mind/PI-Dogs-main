import React from 'react'
import { Link } from 'react-router-dom'
import DogLandingImage from '../../assets/img/lading-dog-image-transformed.png'
import './landing-page.css'

export default function LandingPage() {
  return (
    <>
      <div className='landing'>
        <section className='landing-section'>
          <h1 className='landing-title'>Henry Dogs</h1>
          <Link to='/home'>
            <button className='landing-button'>Enter</button>
          </Link>
        </section>
        <aside className='landing-aside'>
          <img
            className='landing-image'
            src={DogLandingImage}
            alt='dog landing page'
          />
        </aside>
      </div>
      <footer className='landing-footer'>
        <p>
          <a
            className='landing-github'
            href='http://github.com/maat-mind'>
            @maatmind
          </a>{' '}
          with 💛
        </p>
      </footer>
    </>
  )
}
