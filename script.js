document.addEventListener('DOMContentLoaded', () => {
    const truckButton = document.querySelector('.truck-button');
    const cancelButton = document.querySelector('.cancel-button');
    const statusText = document.querySelector('.status-text');
    const box = truckButton.querySelector('.box');
    const truck = truckButton.querySelector('.truck');

    let animationInProgress = false;

    truckButton.addEventListener('click', e => {
        e.preventDefault();

        if (animationInProgress || truckButton.classList.contains('done')) {
            return;
        }

        animationInProgress = true;
        truckButton.classList.add('animation');
        statusText.textContent = 'Processing Order...';

        gsap.to(truckButton, {
            '--box-s': 1,
            '--box-o': 1,
            duration: .3,
            delay: .5
        });

        gsap.to(box, {
            x: 0,
            duration: .4,
            delay: .7
        });

        gsap.to(truckButton, {
            '--hx': -5,
            '--bx': 50,
            duration: .18,
            delay: .92
        });

        gsap.to(box, {
            y: 0,
            duration: .1,
            delay: 1.15
        });

        gsap.set(truckButton, {
            '--truck-y': 0,
            '--truck-y-n': -26
        });

        gsap.to(truckButton, {
            '--truck-y': 1,
            '--truck-y-n': -25,
            duration: .2,
            delay: 1.25,
            onComplete() {
                gsap.timeline({
                    onComplete() {
                        truckButton.classList.add('done');
                        statusText.textContent = 'Order Placed!';
                        animationInProgress = false;
                    }
                }).to(truck, {
                    x: 0,
                    duration: .4
                }).to(truck, {
                    x: 40,
                    duration: 1
                }).to(truck, {
                    x: 20,
                    duration: .6
                }).to(truck, {
                    x: 96,
                    duration: .4
                });
                gsap.to(truckButton, {
                    '--progress': 1,
                    duration: 2.4,
                    ease: "power2.in"
                });
            }
        });
    });

    cancelButton.addEventListener('click', () => {
        truckButton.classList.remove('animation', 'done');
        truckButton.classList.add('cancelled');
        statusText.textContent = 'Order Cancelled';
        animationInProgress = false;

        gsap.set(truck, {
            x: 4
        });
        gsap.set(truckButton, {
            '--progress': 0,
            '--hx': 0,
            '--bx': 0,
            '--box-s': .5,
            '--box-o': 0,
            '--truck-y': 0,
            '--truck-y-n': -26
        });
        gsap.set(box, {
            x: -24,
            y: -6
        });
    });
});