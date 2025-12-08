// client/src/components/sections/FeaturesSection.jsx

import React from 'react';

function FeaturesSection() {
    return (
        <div className="container py-5 mt-5">
            <h2 className="text-center mb-5 text-primary fw-bold">Чому обирають нас?</h2>
            <div className="row text-center">
                <div className="col-md-4 mb-4">
                    <div className="p-4 border rounded shadow-sm h-100">
                        <i className="fa-3x mb-3 text-danger">💰</i>
                        <h5 className="fw-bold">Вигідні тарифи</h5>
                        <p>Гарантуємо найкращі ціни без прихованих платежів.</p>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="p-4 border rounded shadow-sm h-100">
                        <i className="fa-3x mb-3 text-danger">🛡️</i>
                        <h5 className="fw-bold">Повне страхування</h5>
                        <p>Усі автомобілі застраховані за системою КАСКО та ОСАГО.</p>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="p-4 border rounded shadow-sm h-100">
                        <i className="fa-3x mb-3 text-danger">📍</i>
                        <h5 className="fw-bold">24/7 Підтримка</h5>
                        <p>Наші менеджери готові допомогти вам у будь-який час.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeaturesSection;