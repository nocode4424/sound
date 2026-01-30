Button I like


<div class="relative font-inter antialiased">

    <main class="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
        <div class="w-full max-w-6xl mx-auto px-4 md:px-5 py-24">
            <div class="flex justify-center">

                <div class="flex gap-4">
                    <div>
                        <a class="inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-200 dark:text-slate-800 bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-200 dark:to-slate-100 dark:hover:bg-slate-100 shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]" href="#0">Available For Work</a>
                    </div>
                    <div class="dark">
                        <a class="inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-200 dark:text-slate-800 bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-200 dark:to-slate-100 dark:hover:bg-slate-100 shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.2)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]" href="#0">Available For Work</a>
                    </div>
                </div>

            </div>
        </div>
    </main>

    <!-- Page footer -->
    <footer class="absolute left-6 right-6 md:left-12 md:right-auto bottom-4 md:bottom-8 md:text-left">
        <a class="text-xs text-slate-500 hover:underline" href="https://cruip.com">&copy;Cruip - Tailwind CSS
            templates</a>
    </footer>

    <!-- Banner with links -->
    <div class="fixed bottom-0 right-0 w-full md:bottom-6 md:right-12 md:w-auto z-50"
        :class="bannerOpen ? '' : 'hidden'" x-data="{ bannerOpen: true }">
        <div class="bg-slate-900 text-sm p-3 md:rounded shadow flex justify-between">
            <div class="text-slate-500 inline-flex">
                <a class="font-medium hover:underline text-slate-300"
                    href="https://cruip.com/button-shine-effect-on-hover-with-tailwind-css/" target="_blank">
                    Read Tutorial
                </a>
                <span class="italic px-1.5">or</span>
                <a class="font-medium hover:underline text-indigo-500 flex items-center"
                    href="https://github.com/cruip/cruip-tutorials/blob/main/shiny-buttons/index.html" target="_blank"
                    rel="noreferrer">
                    <span>Download</span>
                    <svg class="fill-indigo-400 ml-1" xmlns="http://www.w3.org/2000/svg" width="9" height="9">
                        <path d="m1.649 8.514-.91-.915 5.514-5.523H2.027l.01-1.258h6.388v6.394H7.158l.01-4.226z" />
                    </svg>
                </a>
            </div>
            <button class="text-slate-500 hover:text-slate-400 pl-2 ml-3 border-l border-slate-700"
                @click="bannerOpen = false">
                <span class="sr-only">Close</span>
                <svg class="w-4 h-4 shrink-0 fill-current" viewBox="0 0 16 16">
                    <path
                        d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
                </svg>
            </button>
        </div>
    </div>

</div>

Day night toggle

<label class="switch">
	<input class="switch__input" type="checkbox" role="switch" />
	<span class="switch__icon">
		<span class="switch__icon-part switch__icon-part--1"></span>
		<span class="switch__icon-part switch__icon-part--2"></span>
		<span class="switch__icon-part switch__icon-part--3"></span>
		<span class="switch__icon-part switch__icon-part--4"></span>
		<span class="switch__icon-part switch__icon-part--5"></span>
		<span class="switch__icon-part switch__icon-part--6"></span>
		<span class="switch__icon-part switch__icon-part--7"></span>
		<span class="switch__icon-part switch__icon-part--8"></span>
		<span class="switch__icon-part switch__icon-part--9"></span>
		<span class="switch__icon-part switch__icon-part--10"></span>
		<span class="switch__icon-part switch__icon-part--11"></span>
	</span>
	<span class="switch__sr">Dark Mode</span>
</label>

Complete signup button

<main>
	<button class="expand">
		Submit
		<span class="expand-icon expand-hover">
			<svg class="first" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 32 32" version="1.1">
				<path d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z" />
			</svg>
			<span class="loader"></span>
			<svg class="second" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
				<path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 5L8 15l-5-4" />
			</svg>
		</span>
	</button>
</main>