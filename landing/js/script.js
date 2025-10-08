document.addEventListener('DOMContentLoaded', function() {
    function handleStickyBox() {
        if (window.innerWidth <= 768) {
            var hero = document.querySelector('.cta-button');
            var stickyCta = document.querySelector('.mobile-sticky-cta-box');
            
            if (hero && stickyCta) {
                var heroBottom = hero.offsetTop + hero.offsetHeight;

                if (window.pageYOffset > heroBottom) {
                    stickyCta.style.display = 'block';
                    // Use setTimeout to ensure the display change has taken effect
                    setTimeout(() => {
                        stickyCta.classList.add('visible');
                    }, 10);
                } else {
                    stickyCta.classList.remove('visible');
                    // Wait for the transition to finish before hiding the box
                    stickyCta.addEventListener('transitionend', function hideBox() {
                        if (!stickyCta.classList.contains('visible')) {
                            stickyCta.style.display = 'none';
                        }
                        stickyCta.removeEventListener('transitionend', hideBox);
                    });
                }
            }
        }
    }

    window.addEventListener('scroll', handleStickyBox);
    window.addEventListener('resize', handleStickyBox);
	
	// Privacy Policy Popup
    var privacyPolicyTrigger = document.getElementById('privacy-policy-trigger');
    var privacyPolicyPopup = document.getElementById('privacy-policy-popup');
    var closePrivacyPopup = document.getElementById('close-popup');

    // Terms of Use Popup
    var termsOfUseTrigger = document.getElementById('terms-of-use-trigger');
    var termsOfUsePopup = document.getElementById('terms-of-use-popup');
    var closeTermsPopup = document.getElementById('close-terms-popup');

    function showPopup(popup) {
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling on the main page
    }

    function hidePopup(popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling on the main page
    }

    privacyPolicyTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        showPopup(privacyPolicyPopup);
    });

    termsOfUseTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        showPopup(termsOfUsePopup);
    });

    closePrivacyPopup.addEventListener('click', function() {
        hidePopup(privacyPolicyPopup);
    });

    closeTermsPopup.addEventListener('click', function() {
        hidePopup(termsOfUsePopup);
    });

    // Close popup if clicked outside the content
    window.addEventListener('click', function(e) {
        if (e.target === privacyPolicyPopup) {
            hidePopup(privacyPolicyPopup);
        }
        if (e.target === termsOfUsePopup) {
            hidePopup(termsOfUsePopup);
        }
    });
    
    // Initial call to set correct state on page load
    handleStickyBox();
});