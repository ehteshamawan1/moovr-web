import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Welcome() {
  const steps = [
    {
      title: "Terms and conditions",
      subtitle: "Recommended next step",
      key: "/d/terms",
    },
    {
      title: "CNIC Front side",
      key: "/d/setup-account",
    },
    {
      title: "Upload picture",
      key: "/d/setup-profile",
    },
    {
      title: "Driving license",
      key: "/d/setup-license",
    },
    {
      title: "Vehicle registration book",
      key: "/d/vehicle/registration",
    },
    {
      title: "Vehicle Insurance",
      key: "/d/vehicle/insurance",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[1180px]  bg-white shadow-md rounded-2xl p-8 py-24 relative overflow-hidden">
        {/* Top left curve */}
        <div className="absolute top-0 left-0 ">
          <img src="/driver/auth/welcome.svg" alt="" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-[600px]">
          <h1 className="text-2xl font-semibold mb-2">Welcome Mr. Edmund</h1>
          <p className="text-gray-600 mb-8">
            Here's what you need to do to setup your account.
          </p>

          <div className="grid lg:grid-cols-2 gap-4">
            {steps.map((step) => (
              <Link to={step.key}>
                <button
                  key={step.key}
                  className="w-full p-4 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium">{step.title}</h3>
                    {step.subtitle && (
                      <p className="text-sm text-gray-500">{step.subtitle}</p>
                    )}
                  </div>
                  <FiChevronRight className="text-gray-400" />
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
