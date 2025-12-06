import React from 'react';

const Contacts = () => {
    // Дані для відображення (ви можете замінити їх своїми)
    const contactInfo = [
        { 
            label: 'Адреса', 
            value: 'м. Львів, вул. Свободи, 10', 
            icon: '📍' // Емодзі як візуальний елемент
        },
        { 
            label: 'Телефон', 
            value: '+38 (097) 123 4567', 
            link: 'tel:+380971234567',
            icon: '📞' 
        },
        { 
            label: 'Email', 
            value: 'info@smartcarrent.ua', 
            link: 'mailto:info@smartcarrent.ua',
            icon: '📧' 
        },
    ];

    return (
        <div className="container mx-auto p-4 md:p-10 min-h-[70vh]">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-blue-700 mb-2">Зв'яжіться з нами</h1>
                    <p className="text-gray-600 text-lg">
                        Ми завжди раді допомогти вам з орендою автомобіля.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {contactInfo.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                            {/* Використовуємо простий текст/емодзі замість SVG */}
                            <div className="text-4xl mb-3" role="img" aria-label={item.label}>{item.icon}</div>
                            
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.label}</h3>
                            {item.link ? (
                                <a 
                                    href={item.link} 
                                    className="text-blue-600 hover:text-blue-800 font-medium break-words"
                                >
                                    {item.value}
                                </a>
                            ) : (
                                <p className="text-gray-500">{item.value}</p>
                            )}
                        </div>
                    ))}
                </div>

                <hr className="my-10 border-gray-200" />

                {/* --- Секція Карти --- */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Наше розташування</h2>
                    <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
                        

[Image of Google Maps location marker]

                        <p className="text-gray-500 text-lg p-4 bg-white/70 rounded-lg">
                            Місце для інтерактивної карти
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Contacts;