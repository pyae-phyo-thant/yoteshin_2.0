import React from "react";
import Layout from "../components/Layout";

const Terms = () => {
  return (
    <Layout>
      <div className="p-4">
        <h6 className="text-center text-2xl font-bold text-blue-600 underline">
          Term & Conditions
        </h6>
        <h4 className="text-center text-xl font-bold">
          The MetaMate Drive Service Agreement describes the terms and
          conditions under which YoteShin Drive offers services to you. By using
          our services, the User agrees to be bound by the following terms and
          conditions:
        </h4>
        <ul>
          <li>
            We reserve the right to delete Google DMCA-affected files without
            the user's knowledge.
          </li>
          <li>
            Pornography, nudity, sexual images and any kind offensive images or
            videos are prohibited. Copyrighted material are also strictly
            prohibited. We reserve the right to decide appropriate content and
            can delete images or videos at any time without User notification.
          </li>
          <li>
            We reserve the right to disable direct linking on user accounts that
            use excessive bandwidth or misuse the system.
          </li>
          <li>
            Pornography, nudity, sexual images and any offensive images or
            videos are prohibited. Copyrighted material is also strictly
            prohibited. We reserve the right to deceive content and may delete
            photos or videos at any time without User notice.
          </li>
          <li>
            The user must agree to comply with all applicable rules, including
            copyright and trademark laws. Images, videos and files that infringe
            copyrights or trademarks are not allowed. If someone has a violation
            claim against you, you will be prompted to delete the copyrighted
            file until the issue is resolved. If there is a dispute between the
            participants on this site, MetaMate Drive is not obliged to be
            involved.
          </li>
          <li>
            MetaMate Drive is not liable for your images, videos or files or any
            lost business due to the unavailability or loss of the website. We
            make no claims of future reliability in serving, hosting or storing
            your images, videos or files.
          </li>
        </ul>
        <h4 className="text-center text-xl font-bold">
          YoteShin Drive is commited to cooperate with any and all legal
          authorities if an investigation should arise.
        </h4>
      </div>
    </Layout>
  );
};

export default Terms;
