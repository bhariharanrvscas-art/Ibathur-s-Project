
// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Accounting for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Loan Calculator Functionality
    const calculateBtn = document.getElementById('calculate-btn');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateLoan);
    }
    
    function calculateLoan() {
        // Get input values
        const loanAmount = parseFloat(document.getElementById('loan-amount').value);
        const loanTerm = parseFloat(document.getElementById('loan-term').value);
        const interestRate = parseFloat(document.getElementById('interest-rate').value);
        const loanType = document.getElementById('loan-type').value;
        
        // Validate inputs
        if (isNaN(loanAmount) || isNaN(loanTerm) || isNaN(interestRate) || loanAmount <= 0 || loanTerm <= 0 || interestRate <= 0) {
            alert('Please enter valid values for loan amount, term, and interest rate.');
            return;
        }
        
        // Convert annual interest rate to monthly and decimal form
        const monthlyInterestRate = interestRate / 100 / 12;
        
        // Calculate number of payments
        const numberOfPayments = loanTerm * 12;
        
        // Calculate monthly payment using the formula: P * r * (1+r)^n / ((1+r)^n - 1)
        const monthlyPayment = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments) / 
                              (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        
        // Calculate total payment and interest
        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - loanAmount;
        
        // Display results
        document.getElementById('monthly-payment').textContent = '$' + monthlyPayment.toFixed(2);
        document.getElementById('total-payment').textContent = '$' + totalPayment.toFixed(2);
        document.getElementById('total-interest').textContent = '$' + totalInterest.toFixed(2);
        
        // Show result with animation
        const resultDiv = document.getElementById('result');
        resultDiv.style.display = 'block';
        resultDiv.classList.add('show-result');
        
        // Apply loan-specific adjustments based on loan type
        applyLoanSpecificAdjustments(loanType, loanAmount, loanTerm);
    }
    
    function applyLoanSpecificAdjustments(loanType, loanAmount, loanTerm) {
        // This function can be expanded to show loan-specific information
        // For now it just logs the information
        console.log(`Loan Type: ${loanType}, Amount: $${loanAmount}, Term: ${loanTerm} years`);
        
        // Example of how we could adjust the page based on loan type
        const calculatorSection = document.getElementById('calculator');
        
        // Reset any previous loan-specific classes
        calculatorSection.classList.remove('mortgage-selected', 'auto-selected', 'personal-selected', 'business-selected', 'education-selected');
        
        // Add a class based on the selected loan type
        calculatorSection.classList.add(`${loanType}-selected`);
    }
    
    // Form Validation for Contact/Application Form
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const loanInterest = document.getElementById('loan-interest').value;
            
            if (name === '' || email === '' || phone === '' || loanInterest === '') {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Phone validation - basic check for numeric and reasonable length
            const phonePattern = /^[0-9\-\+\(\)\s]{10,15}$/;
            if (!phonePattern.test(phone)) {
                alert('Please enter a valid phone number.');
                return;
            }
            
            // If all validations pass, show success message
            // In a real app, you would submit this data to a server
            alert('Thank you for your application! Our team will contact you shortly.');
            contactForm.reset();
        });
    }
    
    // Testimonials slider functionality
    const testimonials = [
        {
            text: "FinancePlus made the mortgage process incredibly smooth. Their team guided me through every step, and I got a great rate that saved me thousands.",
            author: "Sarah Johnson"
        },
        {
            text: "I was hesitant about getting an auto loan, but the team at FinancePlus explained everything clearly and found me terms that worked with my budget.",
            author: "Michael Rodriguez"
        },
        {
            text: "As a small business owner, I needed flexible financing options. FinancePlus delivered with a customized business loan that helped my company expand.",
            author: "Jennifer Wilson"
        },
        {
            text: "The education loan from FinancePlus allowed me to complete my degree without financial stress. Their repayment options are truly designed with students in mind.",
            author: "David Thompson"
        }
    ];
    
    let currentTestimonialIndex = 0;
    const testimonialContainer = document.querySelector('.testimonial');
    const testimonialText = document.querySelector('.testimonial-text');
    const testimonialAuthor = document.querySelector('.testimonial-author');
    
    function showTestimonial(index) {
        const testimonial = testimonials[index];
        
        // Fade out
        testimonialContainer.style.opacity = 0;
        
        // Update content after short delay
        setTimeout(() => {
            testimonialText.textContent = `"${testimonial.text}"`;
            testimonialAuthor.textContent = `- ${testimonial.author}`;
            
            // Fade in
            testimonialContainer.style.opacity = 1;
        }, 500);
    }
    
    // Initialize testimonial rotation if elements exist
    if (testimonialContainer && testimonialText && testimonialAuthor) {
        // Set initial testimonial
        showTestimonial(0);
        
        // Rotate testimonials every 8 seconds
        setInterval(() => {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
            showTestimonial(currentTestimonialIndex);
        }, 8000);
    }
    
    // Add CSS for testimonial transitions and mobile menu
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        .testimonial {
            transition: opacity 0.5s ease;
        }
        
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background-color: white;
            padding: 1rem;
            box-shadow: 0 10px 10px rgba(0,0,0,0.1);
        }
        
        .nav-links.active li {
            margin: 0.5rem 0;
        }
        
        .calculator-result {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .show-result {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleSheet);
});