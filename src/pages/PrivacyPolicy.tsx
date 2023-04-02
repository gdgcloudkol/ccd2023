import React from 'react';
import { Helmet } from 'react-helmet';
import { randomTextGoogleColor } from '../services/common.service';

const PrivacyPolicy = (): JSX.Element => {
  const [headingColor, setColor] = React.useState<string>('text-google-gray-3');
  React.useEffect(() => {
    return setColor(randomTextGoogleColor());
  }, []);
  const pClass = 'pb-4 text-md';
  const h2Class =
    'font-bold lg:font-semibold text-2xl text-black dark:text-white md:text-2xl pb-4 lg:text-3xl';
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Google Cloud Community Days Kolkata 2023</title>
        <meta
          name="description"
          content="Privacy Policy | Google Cloud Community Days Kolkata 2023"
        />
        <meta name="author" content="GDG Cloud Kolkata" />
      </Helmet>
      <div className="px-8 md:px-12 lg:px-24 py-6 lg:py-12 text-g-gray-7 dark:text-white">
        <h1
          className={`${headingColor} text-2xl md:text-4xl pb-4 lg:text-4xl `}
        >
          Privacy Policy for GDG Cloud Kolkata
        </h1>
        <p className={pClass}>
          At GDG Cloud Kolkata, accessible from https://gdgcloud.kolkata.dev,
          one of our main priorities is the privacy of our visitors. This
          Privacy Policy document contains types of information that is
          collected and recorded by GDG Cloud Kolkata and how we use it.
        </p>
        <p className={pClass}>
          If you have additional questions or require more information about our
          Privacy Policy, do not hesitate to contact us.
        </p>
        <p className={pClass}>
          This Privacy Policy applies only to our online activities and is valid
          for visitors to our website with regards to the information that they
          shared and/or collect in GDG Cloud Kolkata. This policy is not
          applicable to any information collected offline or via channels other
          than this website. Our Privacy Policy was created with the help of the{' '}
          <a
            className=" text-google-blue hover:underline"
            href="https://www.privacypolicygenerator.info/"
          >
            Free Privacy Policy Generator
          </a>
          .
        </p>
        <h2 className={h2Class}>Consent</h2>
        <p className={pClass}>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </p>
        <h2 className={h2Class}>Information we collect</h2>
        <p className={pClass}>
          The personal information that you are asked to provide, and the
          reasons why you are asked to provide it, will be made clear to you at
          the point we ask you to provide your personal information.
        </p>
        <p className={pClass}>
          If you contact us directly, we may receive additional information
          about you such as your name, email address, phone number, the contents
          of the message and/or attachments you may send us, and any other
          information you may choose to provide.
        </p>
        <p className={pClass}>
          When you register for an Account, we may ask for your contact
          information, including items such as name, company name, address,
          email address, and telephone number.
        </p>
        <h2 className={h2Class}>How we use your information</h2>
        <p className={pClass}>
          We use the information we collect in various ways, including to:
        </p>
        <ul className={pClass}>
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>
            Communicate with you, either directly or through one of our
            partners, including for customer service, to provide you with
            updates and other information relating to the website, and for
            marketing and promotional purposes
          </li>
          <li>Send you emails</li>
          <li>Find and prevent fraud</li>
        </ul>
        <h2 className={h2Class}>Log Files</h2>
        <p className={pClass}>
          GDG Cloud Kolkata follows a standard procedure of using log files.
          These files log visitors when they visit websites. All hosting
          companies do this and a part of hosting services' analytics. The
          information collected by log files include internet protocol (IP)
          addresses, browser type, Internet Service Provider (ISP), date and
          time stamp, referring/exit pages, and possibly the number of clicks.
          These are not linked to any information that is personally
          identifiable. The purpose of the information is for analyzing trends,
          administering the site, tracking users' movement on the website, and
          gathering demographic information.
        </p>
        <h2 className={h2Class}>Cookies and Web Beacons</h2>
        <p className={pClass}>
          Like any other website, GDG Cloud Kolkata uses 'cookies'. These
          cookies are used to store information including visitors' preferences,
          and the pages on the website that the visitor accessed or visited. The
          information is used to optimize the users' experience by customizing
          our web page content based on visitors' browser type and/or other
          information.
        </p>
        <h2 className={h2Class}>Advertising Partners Privacy Policies</h2>
        <p className={pClass}>
          You may consult this list to find the Privacy Policy for each of the
          advertising partners of GDG Cloud Kolkata.
        </p>
        <p className={pClass}>
          Third-party ad servers or ad networks uses technologies like cookies,
          JavaScript, or Web Beacons that are used in their respective
          advertisements and links that appear on GDG Cloud Kolkata, which are
          sent directly to users' browser. They automatically receive your IP
          address when this occurs. These technologies are used to measure the
          effectiveness of their advertising campaigns and/or to personalize the
          advertising content that you see on websites that you visit.
        </p>
        <p className={pClass}>
          Note that GDG Cloud Kolkata has no access to or control over these
          cookies that are used by third-party advertisers.
        </p>
        <h2 className={h2Class}>Third Party Privacy Policies</h2>
        <p className={pClass}>
          GDG Cloud Kolkata's Privacy Policy does not apply to other advertisers
          or websites. Thus, we are advising you to consult the respective
          Privacy Policies of these third-party ad servers for more detailed
          information. It may include their practices and instructions about how
          to opt-out of certain options.{' '}
        </p>
        <p className={pClass}>
          You can choose to disable cookies through your individual browser
          options. To know more detailed information about cookie management
          with specific web browsers, it can be found at the browsers'
          respective websites.
        </p>
        <h2 className={h2Class}>
          CCPA Privacy Rights (Do Not Sell My Personal Information)
        </h2>
        <p className={pClass}>
          Under the CCPA, among other rights, California consumers have the
          right to:
        </p>
        <p className={pClass}>
          Request that a business that collects a consumer's personal data
          disclose the categories and specific pieces of personal data that a
          business has collected about consumers.
        </p>
        <p className={pClass}>
          Request that a business delete any personal data about the consumer
          that a business has collected.
        </p>
        <p className={pClass}>
          Request that a business that sells a consumer's personal data, not
          sell the consumer's personal data.
        </p>
        <p className={pClass}>
          If you make a request, we have one month to respond to you. If you
          would like to exercise any of these rights, please contact us.
        </p>
        <h2 className={h2Class}>GDPR Data Protection Rights</h2>
        <p className={pClass}>
          We would like to make sure you are fully aware of all of your data
          protection rights. Every user is entitled to the following:
        </p>
        <p className={pClass}>
          The right to access – You have the right to request copies of your
          personal data. We may charge you a small fee for this service.
        </p>
        <p className={pClass}>
          The right to rectification – You have the right to request that we
          correct any information you believe is inaccurate. You also have the
          right to request that we complete the information you believe is
          incomplete.
        </p>
        <p className={pClass}>
          The right to erasure – You have the right to request that we erase
          your personal data, under certain conditions.
        </p>
        <p className={pClass}>
          The right to restrict processing – You have the right to request that
          we restrict the processing of your personal data, under certain
          conditions.
        </p>
        <p className={pClass}>
          The right to object to processing – You have the right to object to
          our processing of your personal data, under certain conditions.
        </p>
        <p className={pClass}>
          The right to data portability – You have the right to request that we
          transfer the data that we have collected to another organization, or
          directly to you, under certain conditions.
        </p>
        <p className={pClass}>
          If you make a request, we have one month to respond to you. If you
          would like to exercise any of these rights, please contact us.
        </p>
        <h2 className={h2Class}>Children's Information</h2>
        <p className={pClass}>
          Another part of our priority is adding protection for children while
          using the internet. We encourage parents and guardians to observe,
          participate in, and/or monitor and guide their online activity.
        </p>
        <p className={pClass}>
          GDG Cloud Kolkata does not knowingly collect any Personal Identifiable
          Information from children under the age of 13. If you think that your
          child provided this kind of information on our website, we strongly
          encourage you to contact us immediately and we will do our best
          efforts to promptly remove such information from our records.
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
