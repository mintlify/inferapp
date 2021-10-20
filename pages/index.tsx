import { useState } from 'react';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import {
  MenuIcon,
  XIcon,
  MailIcon,
} from '@heroicons/react/outline';
import axios from 'axios';
import CodeEditor from '../components/CodeEditor';
import Output from '../components/Output';
import { LanguagePrediction } from './api/detect';

const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Documentation', href: '#', current: false },
  { name: 'Community', href: '#', current: false },
];

const footer = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Documentation', href: 'https://marketplace.visualstudio.com/items?itemName=figstack.vsc' },
    { name: 'Community', href: 'https://join.slack.com/t/figstack/shared_invite/zt-wcuer34g-82IxvyAIO5CXtSPemr4LhQ' },
  ],
  social: [
    {
      name: 'Contact Us',
      href: 'mailto:hi@figstack.com',
      icon: function email(props: any) {
        return (
          <MailIcon className="h-6 w-6" {...props} />
        );
      },
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/FigstackApp',
      icon: function twitter(props: any) {
        return (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        );
      },
    },
    {
      name: 'GitHub',
      href: 'https://github.com/figstack',
      icon: function github(props: any) {
        return (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        );
      },
    },
  ],
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [code, setCode] = useState('');
  const [outputDisplay, setOutputDisplay] = useState('');

  const codeOnChange = async (newCode: string) => {
    setCode(newCode);

    if (newCode.length < 40) {
      setOutputDisplay('More code is required to detect');
    } else {
      const detectedResponse = await axios.post('/api/detect', { code: newCode });
      const detected = detectedResponse.data as LanguagePrediction;
      const detectedLanguage = detected.language || '';
      setOutputDisplay(detectedLanguage);
    }
  };

  return (
    <div>
      <Disclosure as="div" className="relative bg-sky-700 pb-32 overflow-hidden">
        {({ open }: any) => (
          <>
            <nav
              className={classNames(
                open ? 'bg-sky-900' : 'bg-transparent',
                'relative z-10 border-b border-teal-500 border-opacity-25 lg:bg-transparent lg:border-none',
              )}
            >
              <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-sky-800">
                  <div className="px-2 flex items-center lg:px-0">
                    <div className="flex-shrink-0">
                      <img
                        className="block h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-teal-400.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden lg:block lg:ml-6 lg:space-x-4">
                      <div className="flex">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current ? 'bg-black bg-opacity-25' : 'hover:bg-sky-800',
                              'rounded-md py-2 px-3 text-sm font-medium text-white',
                            )}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex lg:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="p-2 rounded-md inline-flex items-center justify-center text-sky-200 hover:text-white hover:bg-sky-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block flex-shrink-0 h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block flex-shrink-0 h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="bg-sky-900 lg:hidden">
                <div className="pt-2 pb-3 px-2 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-black bg-opacity-25' : 'hover:bg-sky-800',
                        'block rounded-md py-2 px-3 text-base font-medium text-white',
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </Disclosure.Panel>
            </nav>
            <div
              aria-hidden="true"
              className={classNames(
                open ? 'bottom-0' : 'inset-y-0',
                'absolute inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0',
              )}
            >
              <div className="absolute inset-0 flex">
                <div className="h-full w-1/2" style={{ backgroundColor: '#0a527b' }} />
                <div className="h-full w-1/2" style={{ backgroundColor: '#065d8c' }} />
              </div>
              <div className="relative flex justify-center">
                <svg
                  className="flex-shrink-0"
                  width={1750}
                  height={308}
                  viewBox="0 0 1750 308"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M284.161 308H1465.84L875.001 182.413 284.161 308z" fill="#0369a1" />
                  <path d="M1465.84 308L16.816 0H1750v308h-284.16z" fill="#065d8c" />
                  <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#0a527b" />
                  <path d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z" fill="#0a4f76" />
                </svg>
              </div>
            </div>
            <header className="relative py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-white">Detect the Programming Language</h1>
              </div>
            </header>
          </>
        )}
      </Disclosure>

      <main className="relative -mt-32">
        <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
          <div className="rounded-lg overflow-hidden">
            <div className="grid sm:grid-cols-2 sm:gap-4">
              <div className="h-full">
                <CodeEditor
                  code={code}
                  setCode={codeOnChange}
                  placeholder="Type or paste code here"
                  language={outputDisplay}
                />
              </div>
              <div className="h-full mt-4 sm:m-0">
                <Output
                  output={outputDisplay}
                  isLoading={false}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="relative z-10 bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            {footer.main.map((item) => (
              <div key={item.name} className="px-5 py-2">
                <Link key={item.name} href={item.href} passHref>
                  <button type="button" className="text-base text-gray-500 hover:text-gray-900">
                    {item.name}
                  </button>
                </Link>
              </div>
            ))}
          </nav>
          <div className="mt-8 flex justify-center space-x-6">
            {footer.social.map((item) => (
              <Link key={item.name} href={item.href} passHref>
                <button type="button" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center text-base text-gray-400">&copy; 2021 Figstack, Inc. Powered by GuessLang.</p>
        </div>
      </footer>
    </div>
  );
}
