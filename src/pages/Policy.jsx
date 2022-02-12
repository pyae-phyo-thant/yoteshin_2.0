import React from "react";
import Layout from "../components/Layout";

const Policy = () => {
  return (
    <Layout>
      <div className="p-4">
        <h6 className="text-center text-2xl font-bold text-blue-600 underline">
          Privacy Policy
        </h6>
        <p className="text-justify">
          Your privacy policy must disclose the manner in which your application
          accesses, uses, stores, and or shares Google user data. MetaMate Drive
          operates the meta-mate.pw website, which provides the SERVICE.
          <br />
          This page is used to inform website visitors regarding our policies
          with the collection, use, and disclosure of Personal Information if
          anyone decided to use our Service.
          <br />
          If you choose to use our Service, then you agree to the collection and
          use of information in relation with this policy. The Personal
          Information that we collect are used for providing and improving the
          Service. We will not use or share your information with anyone except
          as described in this Privacy Policy.
          <br />
          The terms used in this Privacy Policy have the same meanings as in our
          Terms and Conditions, which is accessible at meta-mate.pw, unless
          otherwise defined in this Privacy Policy.
        </p>
        <h3 className="text-xl font-bold">Information Collection and Use</h3>
        <p>
          For a better experience while using our Service, we may require you to
          login by google accounts for verification that you want to use our
          sharing services. The information that we collect will be used to
          application access only and not shared with others.
        </p>

        <span>MetaMate Drive want to :</span>
        <ul>
          <li>Create, modify permission folders in your Google Drive</li>
          <li>
            Showing, upload, copy, update, and delete files in your Google Drive
          </li>
          <li>
            Create, access, update, and delete native Google documents in your
            Google Drive
          </li>
          <li>
            Manage files and documents in your Google Drive (e.g., search,
            organize, and modify permissions and other metadata, such as title)
          </li>
        </ul>
        <br />
        <p>
          We will access your Google Drive accounts for implementings our
          sharing concepts. We just create folder & modify permission, showing
          files, delete file, create file & copying file from other user to your
          account that you want to download to your google drive account,
          displays the file information that has been copied and we will display
          profile information such as ID, Name and Email.
        </p>
        <span className="bg-yellow-500 text-white px-2 py-1">
          Note : We don't distrubing other files that you haves.
        </span>
        <p>
          Our website uses these “cookies” to collection information and to
          improve our Service. . If you choose to refuse our cookies, you may
          not be able to use our Service.
        </p>
        <h3 className="text-xl font-bold">Application Access and Uses</h3>
        <p>
          We provide an platform for "easy sharing" your Google Drive Files. We
          know, sometime you will shared your files with your friends. But, how
          if the links are invisible to you someday? Maybe the file will be
          removed by the owner or the links are missing? So, here we are!
          <br />
          We offer an 3rd party tools that you can use for safety the links and
          backup the files that your friends shared with you into your account.
          For example, there are 2 peoples, A and B. Someday, A shared an file
          for B by google drive links. You can inputted the links into our tools
          and the tools will be generated an new links that would be a solution
          for you. Then, with the new link, B can save the files into her/his
          account automatically when their click download button. <br />
          See demo here: https://meta-mate.pw/file/1644655310-demo-test-file-txt
          <br />
          If you interest with our tools, you can use that at homepage and feel
          free to distribute that with your friends. ^_^
        </p>
        <h3 className="text-xl font-bold">Security</h3>
        <p>
          We value your trust in providing us your Personal Information, thus we
          are striving to use commercially acceptable means of protecting it.
          But remember that no method of transmission over the internet, or
          method of electronic storage is 100% secure and reliable, and we
          cannot guarantee its absolute security.
        </p>
        <h3 className="text-xl font-bold">Links to Other Sites</h3>
        <p>
          Our Service may contain links to other sites. If you click on a
          third-party link, you will be directed to that site. Note that these
          external sites are not operated by us. Therefore, we strongly advise
          you to review the Privacy Policy of these websites. We have no control
          over, and assume no responsibility for the content, privacy policies,
          or practices of any third- party sites or services.
        </p>
        <h3 className="text-xl font-bold">Changes to This Privacy Policy</h3>
        <p>
          We may update our Privacy Policy from time to time. Thus, we advise
          you to review this page periodically for any changes. We will notify
          you of any changes by posting the new Privacy Policy on this page.
          These changes are effective immediately, after they are posted on this
          page.
        </p>
        <h3 className="text-xl font-bold">Contact Us</h3>
        <p>
          If you have any questions or suggestions about our Privacy Policy, do
          not hesitate to contact us via email: mm.metamate@gmail.com.
        </p>
        <h3 className="text-xl font-bold">Google Privacy Policy</h3>
        <p>
          Readmore for{" "}
          <a
            className="text-blue-600"
            href="https://policies.google.com/privacy"
            target="_blank"
          >
            Google Privacy Policy
          </a>
        </p>
      </div>
    </Layout>
  );
};

export default Policy;
