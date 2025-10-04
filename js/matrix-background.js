<!DOCTYPE
html >
  <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cyberpunk 3D Coverflow - Dynamic Portfolio</title>
    <style>
        * {
\
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            /* Updated color scheme to red, black, and orange theme */
\
            --primary-grey: #e5e7eb;
            --primary-orange: #ff6b35;
            --primary-red: #dc2626;
            --secondary-amber: #fbbf24;
            --dark-bg: #1a0000;
            --darker-bg: #0a0000;
            --card-bg: rgba(220, 38, 38, 0.1);
            --border-color: rgba(255, 107, 53, 0.3);
            --text-primary: #ffffff;
            --text-secondary: #fca5a5;
            --primary-cyan: #ff6b35;
            --primary-pink: #dc2626;
        }

        body {
\
            font-family: 'JetBrains Mono', 'Fira Code', monospace;
            background: var(--darker-bg);
            color: var(--text-primary);
            line-height: 1.6;
            overflow-x: hidden;
        }

        /* Enhanced Cyberpunk Background */
        .cyber-bg {
\
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--darker-bg);
            overflow: hidden;
            z-index: -5;
        }

        /* Animated gradient background */
        .cyber-gradient {
\
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: 
                radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(255, 0, 255, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(124, 58, 237, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 60% 20%, rgba(249, 115, 22, 0.15) 0%, transparent 50%);
            animation: gradientRotate 30s linear infinite;
            filter: blur(40px);
        }

        @keyframes gradientRotate {
\
            0% { transform: rotate(0deg) scale(1); }
\
            50% { transform: rotate(180deg) scale(1.2); }
\
            100% { transform: rotate(360deg) scale(1); }
        }

        /* Matrix rain effect */
        .matrix-rain {
\
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            opacity: 0.15;
        }

        .matrix-column {
\
            position: absolute;
            top: -100vh;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            color: var(--primary-cyan);
            text-shadow: 0 0 5px var(--primary-cyan);
            animation: matrixFall linear infinite;
            writing-mode: vertical-rl;
            text-orientation: upright;
        }

        @keyframes matrixFall {
\
            0% { transform: translateY(0); }
\
            100% { transform: translateY(200vh); }
        }

        /* Floating particles */
        .particles {
\
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -3;
        }

        .particle {
\
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary-cyan);
            border-radius: 50%;
            box-shadow: 0 0 10px var(--primary-cyan);
            animation: float 20s infinite;
            opacity: 0;
        }

        .particle:nth-child(odd) {
\
            background: var(--primary-pink);
            box-shadow: 0 0 10px var(--primary-pink);
            animation-duration: 25s;
        }

        @keyframes float {
            0% {
\
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
\
                opacity: 1;
            }
            90% {
\
                opacity: 1;
            }
            100% {
\
                transform: translateY(-100vh) translateX(100px);
                opacity: 0;
            }
        }

        /* Glowing orbs */
        .orb {
\
            position: fixed;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.5;
            animation: orbFloat 20s ease-in-out infinite;
            pointer-events: none;
            z-index: -4;
        }

        .orb1 {
\
            width: 300px;
            height: 300px;
            background: var(--primary-cyan);
            top: 10%;
            left: -150px;
            animation-delay: 0s;
        }

        .orb2 {
\
            width: 400px;
            height: 400px;
            background: var(--primary-pink);
            bottom: 10%;
            right: -200px;
            animation-delay: 5s;
        }

        .orb3 {
\
            width: 250px;
            height: 250px;
            background: var(--primary-purple);
            top: 50%;
            left: 50%;
            animation-delay: 10s;
        }

        @keyframes orbFloat {
            0%, 100% {
\
                transform: translate(0, 0) scale(1);
            }
            33% {
\
                transform: translate(100px, -50px) scale(1.1);
            }
            66% {
\
                transform: translate(-50px, 100px) scale(0.9);
            }
        }

        /* Updated header styling to match design reference */
        .header {
\
            position: fixed;
            top: 0;
            width: 100%;
            padding: 1.5rem 3rem;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 107, 53, 0.2);
            z-index: 10000;
            transition: all 0.3s ease;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .header.scrolled {
\
            background: rgba(0, 0, 0, 0.95);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        /* Updated logo styling to match Future branding */
        .header .logo-container {
\
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #ffffff;
        }

        .logo-text {
\
            font-size: 28px;
            font-weight: 700;
            color: #ffffff;
            font-family: 'Arial', sans-serif;
        }

        /* Redesigned navigation to match sleek design reference */
        .main-menu {
            display: flex;
            gap: 2.5rem;
            align-items: center;
            background: transparent;
            padding: 0;
            border-radius: 0;
            border: none;
            box-shadow: none;
            position: relative;
            overflow: visible;
        }

        .main-menu::before {
            display: none;
        }

        .menu-item {
            color: #ffffff;
            text-decoration: none;
            padding: 0.8rem 0;
            border-radius: 0;
            transition: all 0.3s ease;
            position: relative;
            font-weight: 400;
            text-transform: capitalize;
            letter-spacing: 0.5px;
            font-size: 1rem;
            border: none;
            font-family: 'Arial', sans-serif;
        }

        .menu-item::before {
            display: none;
        }

        .menu-item::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: #ff6b35;
            transition: width 0.3s ease;
        }

        .menu-item:hover::after,
        .menu-item.active::after {
            width: 100%;
        }

        .menu-item:hover,
        .menu-item.active {
            color: #ff6b35;
            border-color: transparent;
            box-shadow: none;
            transform: none;
        }

        /* Added contact button styling */
        .menu-item.contact-btn {
            background: #ff6b35;
            color: #ffffff;
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            margin-left: 1rem;
        }

        .menu-item.contact-btn::after {
            display: none;
        }

        .menu-item.contact-btn:hover {
            background: #e55a2b;
            color: #ffffff;
        }

        .menu-toggle {
            display: none;
            flex-direction: column;
            cursor: pointer;
            width: 30px;
            height: 30px;
            justify-content: space-around;
        }

        .menu-toggle span {
            width: 100%;
            height: 2px;
            background: var(--primary-cyan);
            transition: all 0.3s ease;
            box-shadow: 0 0 5px var(--primary-cyan);
        }

        .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }

        /* Section styling */
        .section {
            min-height: 100vh;
            padding: 100px 2rem 50px;
            position: relative;
        }

        /* Updated hero section styling to match design reference */
        .hero-section {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding: 0 3rem;
            position: relative;
            background: linear-gradient(135deg, #000000 0%, #1a0000 50%, #000000 100%);
        }

        .hero-content {
            max-width: 600px;
            z-index: 100;
        }

        .hero-title {
            font-size: 4.5rem;
            font-weight: 900;
            line-height: 1.1;
            margin-bottom: 1rem;
            color: #ffffff;
            font-family: 'Arial', sans-serif;
        }

        .hero-title .highlight {
            background: linear-gradient(135deg, #ff6b35, #ffa500);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .hero-subtitle {
            font-size: 2.5rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 2rem;
            font-family: 'Arial', sans-serif;
        }

        .hero-subtitle .highlight {
            background: linear-gradient(135deg, #ff6b35, #ffa500);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        /* Added statistics cards styling */
        /* Updated stats container positioning to prevent text override */
        .stats-container {
            position: absolute;
            left: 3rem;
            top: 60%;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            z-index: 50;
        }

        .stat-card {
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(10px);
            padding: 1.5rem;
            border-radius: 10px;
            border: 1px solid rgba(255, 107, 53, 0.3);
            min-width: 200px;
        }

        .stat-number {
            font-size: 2rem;
            font-weight: 700;
            color: #ff6b35;
            margin-bottom: 0.5rem;
        }

        .stat-label {
            color: #ffffff;
            font-size: 0.9rem;
            opacity: 0.8;
        }

        /* Removed statistics cards styling */
        /* Updated info section for better logo placement */
        /* Centered INFYRA logo at top and repositioned coverflow */
        .infyra-logo {
            position: fixed;
            top: 15%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 5rem;
            font-weight: 900;
            background: linear-gradient(135deg, #ff6b35, #ffa500);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
            z-index: 100;
            animation: logoGlow 3s ease-in-out infinite alternate;
        }

        @keyframes logoGlow {
            0% { text-shadow: 0 0 30px rgba(255, 107, 53, 0.5); }
            100% { text-shadow: 0 0 50px rgba(255, 107, 53, 0.8), 0 0 70px rgba(255, 165, 0, 0.6); }
        }

        .info .logo-top {
            width: 80px;
            height: 80px;
            margin-bottom: 20px;
            border-radius: 50%;
            border: 3px solid var(--primary-orange);
            padding: 10px;
            background: rgba(10, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            box-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
        }

        .info h2 {
            font-size: 32px;
            margin-bottom: 10px;
            opacity: 0;
            animation: fadeIn 0.6s forwards;
            background: linear-gradient(135deg, var(--primary-orange), var(--primary-red));
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .info p {
            font-size: 16px;
            opacity: 0.7;
            color: var(--text-secondary);
        }

        .coverflow-wrapper {
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding-top: 80px;
        }

        /* Repositioned coverflow to center-bottom */
        /* Moved coverflow section further down */
        .coverflow-section {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 80% !important;
            height: 50vh !important;
            z-index: 200;
        }

        .coverflow-container {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            perspective: 1200px;
            position: relative;
        }

        .coverflow {
            display: flex;
            align-items: center;
            justify-content: center;
            transform-style: preserve-3d;
            position: relative;
            width: 100%;
            height: 400px;
        }

        .coverflow-item {
            position: absolute;
            width: 300px;
            height: 300px;
            transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            cursor: pointer;
            user-select: none;
        }

        /* Updated coverflow item styling for red/orange theme */
        .coverflow-item .cover {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
            position: relative;
            overflow: hidden;
            transform-style: preserve-3d;
            background: #333;
            border: 2px solid rgba(255, 107, 53, 0.3);
        }

        .coverflow-item .cover img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
        }

        .coverflow-item .reflection {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            transform: scaleY(-1);
            opacity: 0.2;
            filter: blur(2px);
            background: linear-gradient(to bottom, 
                rgba(0, 0, 0, 0) 0%, 
                rgba(0, 0, 0, 0.8) 50%, 
                rgba(0, 0, 0, 1) 100%);
            overflow: hidden;
        }

        .coverflow-item.active {
            z-index: 100;
        }

        .coverflow-item.active .cover {
            box-shadow: 0 30px 60px rgba(255, 107, 53, 0.4);
            border-color: var(--primary-orange);
        }

        /* Updated navigation buttons for red/orange theme */

        /* Dots indicator */
        .dots-container {
            position: absolute;
            bottom: 60px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 200;
        }

        .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .dot.active {
            background: var(--primary-cyan);
            transform: scale(1.3);
            box-shadow: 0 0 10px var(--primary-cyan);
        }

        /* Hide play/pause button */
        .play-pause-button {
            display: none;
        }

        /* Countdown Section */
        .countdown-section {
            text-align: center;
            padding: 150px 2rem;
        }

        .countdown-title {
            font-size: 4rem;
            font-weight: 900;
            margin-bottom: 2rem;
            background: linear-gradient(135deg, var(--primary-cyan), var(--primary-pink));
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
        }

        .countdown-date {
            font-size: 1.5rem;
            color: var(--text-secondary);
            margin-bottom: 3rem;
        }

        .countdown-timer {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 3rem;
        }

        .countdown-item {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            padding: 2rem;
            border-radius: 10px;
            backdrop-filter: blur(10px);
            min-width: 120px;
        }

        .countdown-number {
            font-size: 3rem;
            font-weight: 900;
            color: var(--primary-cyan);
            text-shadow: 0 0 20px var(--primary-cyan);
        }

        .countdown-label {
            font-size: 1rem;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* About Section */
        .about-content {
            max-width: 1200px;
            margin: 0 auto;
            text-align: center;
        }

        .about-header h2 {
            font-size: 3rem;
            font-weight: 800;
            color: var(--primary-cyan);
            margin-bottom: 2rem;
            text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        }

        .about-header p {
            font-size: 1.2rem;
            color: var(--text-secondary);
            margin-bottom: 3rem;
        }

        .about-main {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
            margin-bottom: 4rem;
        }

        .about-visual {
            position: relative;
            height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .showcase-display {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 3rem;
            backdrop-filter: blur(10px);
            box-shadow: 0 0 50px rgba(0, 255, 255, 0.2);
        }

        .showcase-logo {
            width: 120px;
            height: 120px;
            margin: 0 auto 2rem;
            background: linear-gradient(135deg, var(--primary-cyan), var(--primary-purple));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .showcase-title {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary-cyan);
            margin-bottom: 1rem;
        }

        .showcase-subtitle {
            color: var(--text-secondary);
            margin-bottom: 2rem;
        }

        .showcase-badges {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .badge {
            background: rgba(0, 255, 255, 0.1);
            color: var(--primary-cyan);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            text-decoration: none;
            border: 1px solid rgba(0, 255, 255, 0.3);
            transition: all 0.3s ease;
        }

        .badge:hover {
            background: rgba(0, 255, 255, 0.2);
            box-shadow: 0 0 15px var(--primary-cyan);
        }

        .about-info {
            text-align: left;
        }

        .about-info h3 {
            font-size: 2rem;
            color: var(--primary-cyan);
            margin-bottom: 1.5rem;
        }

        .about-info p {
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
            line-height: 1.8;
        }

        .feature-list {
            list-style: none;
            margin-bottom: 2rem;
        }

        .feature-list li {
            color: var(--text-secondary);
            padding: 0.5rem 0;
            position: relative;
            padding-left: 2rem;
        }

        .feature-list li::before {
            content: '▶';
            position: absolute;
            left: 0;
            color: var(--primary-cyan);
        }

        .cta-button {
            background: linear-gradient(135deg, var(--primary-cyan), var(--primary-purple));
            color: var(--darker-bg);
            padding: 1rem 2rem;
            text-decoration: none;
            font-weight: 700;
            border-radius: 5px;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0, 255, 255, 0.4);
        }

        /* Events Section */
        .events-content {
            max-width: 1200px;
            margin: 0 auto;
        }

        .events-header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .events-header h2 {
            font-size: 3rem;
            font-weight: 800;
            color: var(--primary-cyan);
            margin-bottom: 1rem;
            text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        }

        .events-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }

        .event-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 15px;
            padding: 2rem;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }

        .event-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 255, 255, 0.2);
        }

        .event-date {
            background: linear-gradient(135deg, var(--primary-cyan), var(--primary-purple));
            color: var(--darker-bg);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 700;
            display: inline-block;
            margin-bottom: 1rem;
        }

        .event-title {
            font-size: 1.5rem;
            color: var(--primary-cyan);
            margin-bottom: 1rem;
        }

        .event-description {
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 1rem;
        }

        .event-location {
            color: var(--text-secondary);
            font-size: 0.9rem;
            opacity: 0.8;
        }

        /* Contact Section */
        .contact-content {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }

        .contact-header h2 {
            font-size: 3rem;
            font-weight: 800;
            color: var(--primary-cyan);
            margin-bottom: 1rem;
            text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        }

        .contact-header p {
            font-size: 1.2rem;
            color: var(--text-secondary);
            margin-bottom: 3rem;
        }

        .contact-form {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            padding: 3rem;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            text-align: left;
        }

        .form-group {
            margin-bottom: 2rem;
        }

        .form-group label {
            display: block;
            color: var(--primary-cyan);
            font-weight: 600;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 0.9rem;
        }

        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 1rem;
            background: rgba(0, 255, 255, 0.05);
            border: 1px solid var(--border-color);
            border-radius: 5px;
            color: var(--text-primary);
            font-family: inherit;
            transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary-cyan);
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
        }

        .form-group textarea {
            resize: vertical;
            min-height: 120px;
        }

        .submit-btn {
            background: linear-gradient(135deg, var(--primary-cyan), var(--primary-purple));
            color: var(--darker-bg);
            padding: 1rem 2rem;
            border: none;
            border-radius: 5px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
        }

        .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0, 255, 255, 0.4);
        }

        /* Added bottom right text styling */
        .bottom-text {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(10px);
            padding: 1.5rem;
            border-radius: 10px;
            border: 1px solid rgba(255, 107, 53, 0.3);
            max-width: 300px;
            z-index: 100;
        }

        .bottom-text h3 {
            color: #ff6b35;
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
        }

        .bottom-text p {
            color: #ffffff;
            font-size: 0.9rem;
            opacity: 0.8;
            line-height: 1.4;
        }

        /* Footer */
        .footer {
            padding: 3rem 2rem 2rem;
            border-top: 1px solid var(--border-color);
            text-align: center;
            background: rgba(0, 0, 0, 0.5);
        }

        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
        }

        .footer-copyright {
            color: var(--text-secondary);
            margin-bottom: 1rem;
        }

        .footer-links {
            display: flex;
            justify-content: center;
            gap: 2rem;
        }

        .footer-links a {
            color: var(--text-secondary);
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .footer-links a:hover {
            color: var(--primary-cyan);
            text-shadow: 0 0 10px var(--primary-cyan);
        }

        /* Scroll to top button */
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--primary-cyan), var(--primary-purple));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }

        .scroll-to-top:hover {
            transform: scale(1.1);
            box-shadow: 0 0 20px var(--primary-cyan);
        }

        @keyframes fadeIn {
            to {
                opacity: 1;
            }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .header {
                justify-content: space-between;
            }
            
            .main-menu {
                display: none;
            }
            
            .menu-toggle {
                display: flex;
            }
            
            .countdown-timer {
                flex-wrap: wrap;
                gap: 1rem;
            }
            
            .countdown-item {
                min-width: 100px;
                padding: 1.5rem;
            }
            
            .about-main {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .about-info {
                text-align: center;
            }
            
            .events-grid {
                grid-template-columns: 1fr;
            }
            
            .coverflow-item {
                width: 200px;
                height: 200px;
            }
            
            .nav-button {
                width: 40px;
                height: 40px;
                font-size: 18px;
            }
            
            .nav-button.prev {
                left: 20px;
            }
            
            .nav-button.next {
                right: 20px;
            }

            .hero-title {
                font-size: 3rem;
            }

            .hero-subtitle {
                font-size: 1.8rem;
            }

            /* Reduced container opacity for background visibility */
            .home-section {
                background: rgba(0, 0, 0, 0.3) !important;
                backdrop-filter: blur(5px);
            }

            /* Removed statistics container */
            /*
            .stats-container {
                position: static;
                flex-direction: row;
                justify-content: space-around;
                margin-top: 2rem;
                left: auto;
                bottom: auto;
            }

            .stat-card {
                min-width: 120px;
                padding: 1rem;
            }
            */

            /* Removed info container to prevent overlap */
            .info {
                display: none;
            }
        }

        /* Hide sections initially */
        .section {
            display: none;
        }

        .section.active {
            display: block;
        }
    </style>
</head>
<body>
    <!-- Dynamic Cyberpunk Background -->
    <div class="cyber-bg">
        <div class="cyber-gradient"></div>
        <div class="matrix-rain" id="matrixRain"></div>
        <div class="particles" id="particlesContainer"></div>
        <div class="orb orb1"></div>
        <div class="orb orb2"></div>
        <div class="orb orb3"></div>
    </div>

    <!-- Header -->
    <header class="header" id="header">
        <a href="#home" class="logo-container">
            <span class="logo-text">INFYRA</span>
        </a>
        
        <!-- Updated navigation menu to match design reference -->
        <nav class="main-menu" id="mainMenu">
            <a href="#home" class="menu-item active">Home</a>
            <a href="#events" class="menu-item">Events</a>
            <a href="#about" class="menu-item">About Us</a>
            <a href="#contact" class="menu-item">Contact</a>
            <a href="#team" class="menu-item">Team</a>
            <a href="#sponsors" class="menu-item">Sponsors</a>
            <a href="#register" class="menu-item contact-btn">Register</a>
        </nav>
        
        <div class="menu-toggle" id="menuToggle">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </header>

    <!-- Home Section -->
    <!-- Updated home section with reduced opacity -->
    <div class="section active home-section" id="home">
        <div class="hero-content">
            <h1 class="hero-title">STEP INTO THE</h1>
            <h2 class="hero-subtitle">FUTURE</h2>
            <p class="hero-description">VIRTUAL UNIVERSE</p>
        </div>

        <!-- Repositioned statistics to prevent text override -->
        
    </div>

    <!-- Centered INFYRA logo at top -->
    <div class="infyra-logo">INFYRA</div>
    
    <!-- Added bottom right text instead of statistics -->
    <div class="bottom-text">
        <h3>Virtual Universe</h3>
        <p>Experience the future of technology with our immersive virtual reality solutions and cutting-edge innovations.</p>
    </div>
    
    <!-- Repositioned coverflow section to center-bottom -->
    <div class="coverflow-section">
        <div class="coverflow-container">
            <div class="coverflow" id="coverflow">
                <!-- Existing coverflow items remain unchanged -->
                <div class="coverflow-item" data-index="0">
                    <div class="cover">
                        <img src="/placeholder.svg?height=300&width=300" alt="Neon City" loading="lazy">
                    </div>
                    <div class="reflection"></div>
                </div>
                <div class="coverflow-item" data-index="1">
                    <div class="cover">
                        <img src="/placeholder.svg?height=300&width=300" alt="Android Future" loading="lazy">
                    </div>
                    <div class="reflection"></div>
                </div>
                <div class="coverflow-item" data-index="2">
                    <div class="cover">
                        <img src="/placeholder.svg?height=300&width=300" alt="Digital Matrix" loading="lazy">
                    </div>
                    <div class="reflection"></div>
                </div>
                <div class="coverflow-item" data-index="3">
                    <div class="cover">
                        <img src="/placeholder.svg?height=300&width=300" alt="Cyber Terminal" loading="lazy">
                    </div>
                    <div class="reflection"></div>
                </div>
                <div class="coverflow-item" data-index="4">
                    <div class="cover">
                        <img src="/placeholder.svg?height=300&width=300" alt="VR World" loading="lazy">
                    </div>
                    <div class="reflection"></div>
                </div>
                <div class="coverflow-item" data-index="5">
                    <div class="cover">
                        <img src="/placeholder.svg?height=300&width=300" alt="Space Tech" loading="lazy">
                    </div>
                    <div class="reflection"></div>
                </div>
                <div class="coverflow-item" data-index="6">
                    <div class="cover">
                        <img src="/placeholder.svg?height=300&width=300" alt="Cyber Street" loading="lazy">
                    </div>
                    <div class="reflection"></div>
                </div>
            </div>

            <div class="dots-container" id="dots"></div>
            
            <!-- Removed play/pause button -->
        </div>
    </div>

    <!-- Countdown Section -->
    <section id="countdown" class="section">
        <div class="countdown-section">
            <h1 class="countdown-title">Event Countdown</h1>
            <p class="countdown-date">September 25th, 2025 - The Future Begins</p>
            
            <div class="countdown-timer" id="countdownTimer">
                <div class="countdown-item">
                    <div class="countdown-number" id="days">000</div>
                    <div class="countdown-label">Days</div>
                </div>
                <div class="countdown-item">
                    <div class="countdown-number" id="hours">00</div>
                    <div class="countdown-label">Hours</div>
                </div>
                <div class="countdown-item">
                    <div class="countdown-number" id="minutes">00</div>
                    <div class="countdown-label">Minutes</div>
                </div>
                <div class="countdown-item">
                    <div class="countdown-number" id="seconds">00</div>
                    <div class="countdown-label">Seconds</div>
                </div>
            </div>
            
            <p style="color: var(--text-secondary); font-size: 1.1rem; margin-top: 2rem;">
                Join us for the ultimate cyberpunk experience. The digital revolution awaits.
            </p>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section">
        <div class="about-content">
            <div class="about-header">
                <h2>About Cyberpunk Flow</h2>
                <p>Immerse yourself in a revolutionary 3D experience that blends cutting-edge technology with stunning visual artistry</p>
            </div>
            
            <div class="about-main">
                <div class="about-visual">
                    <div class="showcase-display">
                        <div class="showcase-logo">
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <rect x="10" y="25" width="15" height="50" fill="white" transform="rotate(-15 17.5 50)" opacity="0.9" />
                                <rect x="35" y="15" width="15" height="70" fill="white" />
                                <rect x="60" y="25" width="15" height="50" fill="white" transform="rotate(15 67.5 50)" opacity="0.9" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke="white" stroke-width="2" opacity="0.3" />
                            </svg>
                        </div>
                        
                        <h3 class="showcase-title">Cyberpunk Flow</h3>
                        <p class="showcase-subtitle">Transform your digital galleries into immersive cyberpunk experiences</p>
                        
                        <div class="showcase-badges">
                            <a href="#" class="badge">HTML5</a>
                            <a href="#" class="badge">CSS3</a>
                            <a href="#" class="badge">JavaScript</a>
                            <a href="#" class="badge">3D Effects</a>
                        </div>
                    </div>
                </div>
                
                <div class="about-info">
                    <h3>Experience the Future</h3>
                    <p>Cyberpunk Flow revolutionizes how you present visual content with cutting-edge 3D coverflow technology. Create immersive, interactive galleries that transport your audience into a cyberpunk universe.</p>
                    <p>Whether showcasing digital art, product designs, or creating interactive stories, our platform brings your content to life with fluid animations, dynamic backgrounds, and intuitive controls.</p>
                    
                    <ul class="feature-list">
                        <li>Smooth 3D transitions with hardware acceleration</li>
                        <li>Dynamic cyberpunk background effects</li>
                        <li>Touch-enabled navigation for all devices</li>
                        <li>Customizable autoplay and timing controls</li>
                        <li>Matrix rain and particle effects</li>
                        <li>Responsive design for any screen size</li>
                    </ul>
                    
                    <a href="#contact" class="cta-button">
                        Start Your Journey
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Events Section -->
    <section id="events" class="section">
        <div class="events-content">
            <div class="events-header">
                <h2>Upcoming Events</h2>
                <p>Join us for exclusive cyberpunk experiences and digital art showcases</p>
            </div>
            
            <div class="events-grid">
                <div class="event-card">
                    <div class="event-date">Sep 25, 2025</div>
                    <h3 class="event-title">Cyberpunk Flow Launch</h3>
                    <p class="event-description">The official launch of our revolutionary 3D coverflow platform. Experience the future of digital galleries with live demonstrations and interactive showcases.</p>
                    <p class="event-location">📍 Virtual Reality Space, Metaverse</p>
                </div>
                
                <div class="event-card">
                    <div class="event-date">Oct 15, 2025</div>
                    <h3 class="event-title">Digital Art Exhibition</h3>
                    <p class="event-description">Immerse yourself in a curated collection of cyberpunk digital art from renowned artists worldwide. Interactive 3D galleries and live artist talks.</p>
                    <p class="event-location">📍 Neo Tokyo Gallery, Japan</p>
                </div>
                
                <div class="event-card">
                    <div class="event-date">Nov 03, 2025</div>
                    <h3 class="event-title">Tech Innovation Summit</h3>
                    <p class="event-description">Explore the latest in 3D web technologies, AR/VR integration, and the future of interactive media. Network with industry leaders and innovators.</p>
                    <p class="event-location">📍 Silicon Valley Convention Center</p>
                </div>
                
                <div class="event-card">
                    <div class="event-date">Dec 12, 2025</div>
                    <h3 class="event-title">Neon Nights Festival</h3>
                    <p class="event-description">A celebration of cyberpunk culture featuring music, art, and technology. Experience live performances in our immersive 3D environments.</p>
                    <p class="event-location">📍 Cyber District, Los Angeles</p>
                </div>
                
                <div class="event-card">
                    <div class="event-date">Jan 20, 2026</div>
                    <h3 class="event-title">Developer Workshop</h3>
                    <p class="event-description">Learn to create your own cyberpunk 3D experiences. Hands-on coding workshop covering advanced CSS animations, JavaScript interactions, and 3D effects.</p>
                    <p class="event-location">📍 Online & In-Person Hybrid</p>
                </div>
                
                <div class="event-card">
                    <div class="event-date">Feb 14, 2026</div>
                    <h3 class="event-title">Love in the Matrix</h3>
                    <p class="event-description">A special Valentine's event exploring digital relationships and connections in virtual spaces. Interactive experiences and romantic cyberpunk aesthetics.</p>
                    <p class="event-location">📍 Virtual Love Lounge</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section">
        <div class="contact-content">
            <div class="contact-header">
                <h2>Get In Touch</h2>
                <p>Ready to enter the cyberpunk dimension? Let's create something extraordinary together.</p>
            </div>
            
            <form class="contact-form" onsubmit="handleSubmit(event)">
                <div class="form-group">
                    <label for="name">Your Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="subject">Subject</label>
                    <input type="text" id="subject" name="subject" required>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" required></textarea>
                </div>
                <button type="submit" class="submit-btn">Send Message</button>
            </form>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-copyright">
                © 2025 Cyberpunk Flow. All rights reserved. | Powered by the Future
            </div>
            <div class="footer-links">
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#support">Support</a>
            </div>
        </div>
    </footer>

    <!-- Scroll to top button -->
    <div class="scroll-to-top" id="scrollToTop">
        <span>↑</span>
    </div>

    <script>
        // Coverflow functionality
        const items = document.querySelectorAll('.coverflow-item');
        const dotsContainer = document.getElementById('dots');
        const currentTitle = document.getElementById('current-title');
        const currentDescription = document.getElementById('current-description');
        const container = document.querySelector('.coverflow-container');
        const menuToggle = document.getElementById('menuToggle');
        const mainMenu = document.getElementById('mainMenu');
        let currentIndex = 0;
        let autoplayInterval;

        // Image data with titles and descriptions
        const imageData = [
            {
                title: "Neon City",
                description: "Towering skyscrapers illuminated by endless neon lights"
            },
            {
                title: "Android Future",
                description: "Advanced AI beings in a post-human world"
            },
            {
                title: "Digital Matrix",
                description: "The code that runs our virtual reality"
            },
            {
                title: "Cyber Terminal",
                description: "Gateway to the digital underground"
            },
            {
                title: "VR World",
                description: "Immersive virtual reality experiences"
            },
            {
                title: "Space Tech",
                description: "Advanced spacecraft of the future"
            },
            {
                title: "Cyber Street",
                description: "Life in the cyberpunk metropolis"
            }
        ];

        // Generate Matrix Rain Effect
        function generateMatrixRain() {
            const matrixRain = document.getElementById('matrixRain');
            const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
            const columns = Math.floor(window.innerWidth / 20);
            
            for (let i = 0; i < columns; i++) {
                const column = document.createElement('div');
                column.className = 'matrix-column';
                column.style.left = `${i * 20}px`;
                column.style.animationDuration = `${Math.random() * 5 + 10}s`;
                column.style.animationDelay = `${Math.random() * 5}s`;
                
                let text = '';
                const charCount = Math.floor(Math.random() * 20 + 10);
                for (let j = 0; j < charCount; j++) {
                    text += characters[Math.floor(Math.random() * characters.length)] + ' ';
                }
                column.textContent = text;
                
                matrixRain.appendChild(column);
            }
        }

        // Generate Floating Particles
        function generateParticles() {
            const particlesContainer = document.getElementById('particlesContainer');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.animationDelay = `${Math.random() * 20}s`;
                particle.style.animationDuration = `${Math.random() * 10 + 20}s`;
                
                particlesContainer.appendChild(particle);
            }
        }

        // Create dots
        items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.onclick = () => goToIndex(index);
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');
        let isAnimating = false;

        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % items.length;
                updateCoverflow();
            }, 3000);
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        function updateCoverflow() {
            if (isAnimating) return;
            isAnimating = true;

            items.forEach((item, index) => {
                let offset = index - currentIndex;
                
                if (offset > items.length / 2) {
                    offset = offset - items.length;
                }
                else if (offset < -items.length / 2) {
                    offset = offset + items.length;
                }
                
                const absOffset = Math.abs(offset);
                const sign = Math.sign(offset);
                
                let translateX = offset * 220;
                let translateZ = -absOffset * 200;
                let rotateY = -sign * Math.min(absOffset * 60, 60);
                let opacity = 1 - (absOffset * 0.2);
                let scale = 1 - (absOffset * 0.1);

                if (absOffset > 3) {
                    opacity = 0;
                    translateX = sign * 800;
                }

                item.style.transform = `
                    translateX(${translateX}px) 
                    translateZ(${translateZ}px) 
                    rotateY(${rotateY}deg)
                    scale(${scale})
                `;
                item.style.opacity = opacity;
                item.style.zIndex = 100 - absOffset;

                item.classList.toggle('active', index === currentIndex);
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            const currentData = imageData[currentIndex];
            currentTitle.textContent = currentData.title;
            currentDescription.textContent = currentData.description;
            
            currentTitle.style.animation = 'none';
            currentDescription.style.animation = 'none';
            setTimeout(() => {
                currentTitle.style.animation = 'fadeIn 0.6s forwards';
                currentDescription.style.animation = 'fadeIn 0.6s forwards';
            }, 10);

            setTimeout(() => {
                isAnimating = false;
            }, 600);
        }

        function goToIndex(index) {
            if (isAnimating || index === currentIndex) return;
            currentIndex = index;
            updateCoverflow();
        }

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    goToIndex((currentIndex + 1) % items.length);
                } else {
                    goToIndex((currentIndex - 1 + items.length) % items.length);
                }
            }
        }

        // Keyboard navigation
        container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') goToIndex((currentIndex - 1 + items.length) % items.length);
            if (e.key === 'ArrowRight') goToIndex((currentIndex + 1) % items.length);
        });

        // Click on items to select
        items.forEach((item, index) => {
            item.addEventListener('click', () => goToIndex(index));
        });

        // Navigation functionality
        function showSection(sectionId) {
            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            document.getElementById(sectionId).classList.add('active');
            
            // Update active menu item
            document.querySelectorAll('.menu-item').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelector(`[href="#${sectionId}"]`).classList.add('active');
            
            // Close mobile menu if open
            menuToggle.classList.remove('active');
            mainMenu.style.display = 'flex';
        }

        // Menu item click handlers
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('href').substring(1);
                showSection(targetId);
            });
        });

        // Mobile menu toggle
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            if (menuToggle.classList.contains('active')) {
                mainMenu.style.display = 'flex';
                mainMenu.style.position = 'fixed';
                mainMenu.style.top = '80px';
                mainMenu.style.right = '20px';
                mainMenu.style.flexDirection = 'column';
                mainMenu.style.background = 'var(--darker-bg)';
                mainMenu.style.padding = '2rem';
                mainMenu.style.borderRadius = '10px';
                mainMenu.style.border = '1px solid var(--border-color)';
                mainMenu.style.backdropFilter = 'blur(20px)';
                mainMenu.style.zIndex = '9999';
            } else {
                mainMenu.style.display = 'flex';
                mainMenu.style.position = 'static';
                mainMenu.style.flexDirection = 'row';
                mainMenu.style.background = 'none';
                mainMenu.style.padding = '0';
                mainMenu.style.border = 'none';
            }
        });

        // Countdown functionality
        function updateCountdown() {
            const targetDate = new Date('September 25, 2025 00:00:00').getTime();
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                document.getElementById('days').textContent = days.toString().padStart(3, '0');
                document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
                document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
                document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            } else {
                document.getElementById('days').textContent = '000';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
            }
        }

        // Scroll effects
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            const scrollToTopBtn = document.getElementById('scrollToTop');
            
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top
        document.getElementById('scrollToTop').addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Form submission
        function handleSubmit(event) {
            event.preventDefault();
            alert('Message sent! We\'ll get back to you in the digital realm.');
            event.target.reset();
        }

        function initializeCoverflow() {
            updateCoverflow();
            createDots();
            // Start autoplay immediately
            startAutoplay();

            // Pause on hover, resume on leave
            coverflowContainer.addEventListener('mouseenter', stopAutoplay);
            coverflowContainer.addEventListener('mouseleave', startAutoplay);
        }

        // Initialize everything
        generateMatrixRain();
        generateParticles();
        initializeCoverflow();
        container.focus();
        
        // Update countdown every second
        setInterval(updateCountdown, 1000);
        updateCountdown();

        // Mobile responsive adjustments
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.menu-item').forEach(item => {
                item.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    mainMenu.style.display = 'flex';
                    mainMenu.style.position = 'static';
                    mainMenu.style.flexDirection = 'row';
                    mainMenu.style.background = 'none';
                    mainMenu.style.padding = '0';
                    mainMenu.style.border = 'none';
                });
            });
        }

        function createDots() {
            dotsContainer.innerHTML = '';
            items.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = 'dot';
                dot.addEventListener('click', () => goToIndex(index));
                dotsContainer.appendChild(dot);
            });
            updateDots();
        }

        function updateDots() {
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
    </script>
</body>
</html>
