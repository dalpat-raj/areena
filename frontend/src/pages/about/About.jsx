import React from 'react'
import "./about.scss";
import Footer from '../../components/layout/footer/Footer';
import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <>
      <Helmet>
          <meta charSet="utf-8" />
          <title>About-us</title>
          <meta name="description" content="Online Shopping India - Buy clothing, laptops, camera, T-shirt, watches, apparel, shoes. Free Shipping & Cash on Delivery" />
          <link rel="canonical" href={`https://areenaa.in/about-us`} />
        </Helmet>
       <div className='about'>
       <h2>About <b>Areenaa Enterprise</b></h2>
       <p>Welcome to Areenaa Enterprise, one source for all things cloth & beauty. We're dedicated to giving you the very best of product, with a focus on cloth's, beauty, electronic.</p><br/>

       <p>Founded in 2024 by Kamlesh Kumar, Areenaa Enterprise has come a long way from its beginnings in Rajsthan (India). When Kamlesh first started out, his passion for "eco-friendly cleaning products" drove them to action: quit day job, do tons of research, etc. so that Your Company Name can offer you "the world's most advanced toothbrush". We now serve customers all over India, the world, and are thrilled that we're able to turn our passion into our own website.</p><br/>

       <p>we hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.

        </p><br/>
        <p>Sincerely,

        Kamlesh Kumar</p><br/>
       </div>
      <Footer/>
    </>
  )
}

export default About