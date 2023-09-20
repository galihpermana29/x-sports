'use client';
import CmsAPI from '@/api/cms';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CMS() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let payload: { email: string; password: string };

    if (e.target instanceof HTMLFormElement) {
      const targetEmail = e.target.elements.namedItem('email');
      const targetPassword = e.target.elements.namedItem('password');
      const emailPay = (targetEmail as HTMLInputElement).value;
      const passwordPay = (targetPassword as HTMLInputElement).value;
      payload = { email: emailPay, password: passwordPay };
    }

    try {
      const { data } = await CmsAPI.login(payload);
      localStorage.setItem('cms_user', JSON.stringify(data));
      router.push('/cms/home/ongoing');
      toast.success('Successfully Logged In!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      if (error) {
        const axiosError = error as AxiosError; // Cast error to AxiosError
        const responseData = axiosError.response?.data as
          | { errors: string[] }
          | undefined;
        const err = responseData
          ? responseData?.errors[0]
          : 'Ouch, an error happen!';
        toast.error(err, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        console.error(error, 'err');
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-login bg-cover bg-center bg-no-repeat ">
      <ToastContainer />
      <form
        className="bg-white rounded-[24px] p-[20px]"
        onSubmit={handleSubmit}>
        <div className="text-center">
          <h1 className="font-bold text-2xl text-[#0D0C41]">Sign In</h1>
          <p className="text-lg mb-[20px] text-[#0D0C41]">
            We will help you get ready today
          </p>
        </div>
        <div>
          <label htmlFor="email" className="text-[#0D0C41]">
            Email Address or Phone Number
          </label>
          <br />
          <input
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            className="border-[1px] border-[#D8D8E4] rounded-[50px] h-[55px] w-[400px] px-[20px] mt-[12px]"
          />
        </div>
        <div className="mt-[20px]">
          <label htmlFor="password">Password</label>
          <br />
          <input
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            className="border-[1px] border-[#D8D8E4] rounded-[50px] h-[55px] w-[400px] px-[20px] mt-[12px]"
          />
        </div>
        <button
          type="submit"
          className="bg-[#F44D0E] text-white rounded-[50px] h-[55px] w-[400px] mt-[20px]">
          Login
        </button>
      </form>
    </div>
  );
}
