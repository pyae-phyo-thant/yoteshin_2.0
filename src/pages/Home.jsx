import React from "react";
import Layout from "../components/Layout";

const Home = () => {
  return <Layout>
    <section className="bg-[#0a183d] py-[60px]">
<div className="w-[90%] m-auto">
<div className="grid grid-cols-2 gap-4">
  <div>
    <div className="hero-section-text text-white">
      <h2 className="text-6xl font-bold">
      Welcome to <br />
      <span className="text-red-600">Meta</span>Mate
      Drive
      </h2>
      <br />
      <p className="text-bold">
      Let's share your file easily without any limitation and anonymously.
      MetaMate Drive is created with love for everyone who wants to share or download any media files
      uploaded to google drive. We are using P2P download system so your files are
      safe and never exceeded download limit.
      </p>
    </div>
  </div>
<div>
<div className="hero-section-image">
<img src="https://yoteshinportal.cc/assets/hero-section-image.svg" width="100%" />
</div>
</div>
</div>
</div>
</section>
<section className="pt-[100px]">
<div className="w-[90%] m-auto">
<div className="grid grid-cols-2 items-center">
<div className="col-lg-6">
<img src="https://yoteshinportal.cc/assets/fast.svg" width="80%" />
</div>
<div className="col-lg-6">
<h2 className="text-6xl font-bold">
Fastest<br /> <span className="text-red-600">download</span>
<br /> speed
</h2>
<br />
<p>
By using Google CDN server, users can download with full network bandwidth speed.
We give the fastest download speed ever among any other all servers for downloading files
because the files are uploaded and downloaded by using Google CDN servers.<br />
Also support Pause and Resume with our <a href="#application">MetaMate Drive</a> mobile application.
</p>
</div>
</div>
</div>
</section>
<section className="pt-[100px]">
<div className="w-[90%] m-auto">
<div className="grid grid-cols-2 items-center">
<div className="col-lg-6">
<h2 className="text-6xl font-bold">
Unlimited<br /> <span className="text-red-600">download</span><br /> counts
</h2>
</div>
<div className="col-lg-6">
<p>
Truely unlimited sharing of your any media files over the internet.
Your original files are encryped and encoded by our system so that your files are always safe.
Users can always be able to download files at anytime with no limit.
</p>
</div>
</div>
</div>
</section>
<section className="pt-[100px]">
<div className="w-[90%] m-auto">
<div className="grid grid-cols-2 items-center">
<div className="col-lg-6 order-lg-2">
<p>
Moreover, our system use P2P advanced sharing technology,
to reduce loads on your original files and we make sure that your files are always ready to download by your
users. We provide the ability against google drive sharing limitation
and download limitation so your files will not be limited for downloading when sharing so many times.
</p>
</div>
<div className="col-lg-6 order-lg-1">
<h2 className="text-6xl font-bold">
<span className="text-red-600">P2P</span> Sharing <br />System
</h2>

</div>
</div>
</div>
</section>
<section className="pt-[100px] mb-4" id="how-it-works">
<div className="w-[90%] m-auto">
<h3 className="text-3xl font-bold">How It Works?</h3>
<div className="grid grid-cols-3 mt-4">
<div className="col-lg-4 col-sm-12">
<h5 className="text-red-600 font-bold">Step 1</h5>
<p>
First, you will need gmail account and sign up using your google account.
Then you can download all files on our website as a user.
</p>
</div>
<div className="col-lg-4 col-sm-12">
<h5 className="text-red-600 font-bold">Step 2</h5>
<p>
If you are a publisher and if you want to share your files on your google drive,
you can register as a publisher. Click on "Create publisher account". Then you can enter
your details and register as a publisher.
</p>
</div>
<div className="col-lg-4 col-sm-12">
<h5 className="text-red-600 font-bold">Step 3</h5>
<p>
After you have registered as a publisher, you can start sharing your files on google drive by
entering share link from google drive on our website. Then we will encrypt your original file and
then you can share unlimited numbers of times and unlimited download counts.
</p>
</div>
</div>
</div>
</section>
  </Layout>
};

export default Home;
