/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				display: ['Fraunces', 'Georgia', 'serif'],
				sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				plum: {
					50: '#faf5f8',
					100: '#f4e9f0',
					200: '#e8d2e1',
					300: '#d4aec8',
					400: '#b980a5',
					500: '#9d5c87',
					600: '#80446b',
					700: '#653556',
					800: '#482640',
					900: '#2e1a28',
					950: '#1f1119',
				},
				gold: {
					100: '#f8efdc',
					200: '#f0dcb3',
					300: '#e5c283',
					400: '#d9a656',
					500: '#c98d36',
					600: '#a8702a',
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			boxShadow: {
				soft: '0 1px 2px rgba(46, 26, 40, 0.04), 0 8px 24px -6px rgba(46, 26, 40, 0.08)',
				lift: '0 2px 4px rgba(46, 26, 40, 0.04), 0 20px 40px -12px rgba(46, 26, 40, 0.18)',
				glow: '0 10px 30px -8px hsl(343 65% 48% / 0.45)',
			},
			backgroundImage: {
				'hero-gradient': 'linear-gradient(180deg, rgba(31,17,25,0.25) 0%, rgba(31,17,25,0.55) 55%, rgba(31,17,25,0.92) 100%)',
				'rose-glow': 'radial-gradient(60% 60% at 50% 0%, hsl(345 60% 95%) 0%, transparent 70%)',
			},
			keyframes: {
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(12px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
				shimmer: 'shimmer 2s linear infinite',
				'accordion-down': 'accordion-down 0.25s ease-out',
				'accordion-up': 'accordion-up 0.25s ease-out',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
}
