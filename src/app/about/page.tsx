export default function AboutPage() {
    return (
        <div className="flex flex-col items-center gap-5 mt-10 h-full">
            <div className="w-11/12 md:w-1/2">
                <h3 className="font-bold text-3xl pb-3">
                    About Us
                </h3>
                <div>
                    Welcome to TicketHero - your ultimate ticket companion!
                </div>
            </div>
            <div className="w-11/12 md:w-1/2">
                <h3 className="font-bold text-2xl pb-3">
                    Who We Are
                </h3>
                <div>
                    At TicketHero, we understand the excitement and joy that attending live events can bring.
                    Whether it&apos;s a concert, sports game, theater performance, or any other live experience, we
                    believe
                    that getting the best-priced tickets should be a hassle-free and enjoyable process. That&apos;s
                    why
                    we
                    created this platform - to be your ultimate ticket companion.
                </div>
            </div>
            <div className="w-11/12 md:w-1/2">
                <h3 className="font-bold text-2xl pb-3">
                    What We Do
                </h3>
                <div>
                    Our mission is simple: we help you find the best deals on tickets across various events and
                    ticket
                    sites. We aggregate ticket information from a wide range of sources, giving you a comprehensive
                    overview of available options. With our user-friendly interface, you can easily find the best
                    prices available.
                </div>
            </div>
            <div className="w-11/12 md:w-1/2">
                <h3 className="font-bold text-2xl pb-3">
                    How It Works
                </h3>
                <ol className="list-decimal pl-4">
                    <li>
                        Search & Discover: Simply enter the performer/team you&apos;re interested in, and let us do
                        the rest. Our
                        advanced search algorithms use a variety of sources to find the best ticket prices for you.
                    </li>
                    <li className="pt-4">
                        Compare Prices: We provide a side-by-side comparison of ticket prices from different ticket
                        sites. See all your options at a glance and choose the one that suits your budget.
                    </li>
                    <li className="pt-4">
                        Once you&apos;ve found the perfect ticket, we seamlessly redirect you to the official ticket
                        provider&apos;s website to complete your purchase securely. Rest assured, your transactions
                        are
                        in good hands.
                    </li>
                </ol>
            </div>
            <div className="w-11/12 md:w-1/2">
                <h3 className="font-bold text-2xl pb-3">
                    Disclosure
                </h3>
                <div>
                    TicketHero is a comparison site that allows you to compare tickets from other ticket resellers.
                    This means the TicketHero does <b><u>not</u></b> own, or sell any tickets directly. Any purchase of
                    tickets is done through a reseller once you are redirected to their site. We currently show tickets
                    from the following resellers:
                    <ul className="list-disc list-inside mt-5 mb-5">
                        <li><b>StubHub</b>: <a className="underline"
                                               href=" https://stubhub.prf.hn/click/camref:1011l3CAuv"> www.stubhub.com</a>
                        </li>
                        <li><b>VividSeats</b>: <a className="underline"
                                                  href="https://vivid-seats.pxf.io/Mmxogo"> www.vividseats.com</a></li>
                        <li><b>SeatGeek</b>:
                            <a className="underline" href="https://seatgeek.com/"> seatgeek.com</a>
                        </li>
                        <li><b>Gametime</b>:
                            <a className="underline" href="https://gametime.co/"> gametime.co</a>
                        </li>
                    </ul>
                    Stay tuned as we continue to add more sites and enhance your ticket searching!
                </div>
            </div>
        </div>
    );

}

