import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

// Компонент, який відображає поле даних або форму вводу (для чистоти коду)
const ProfileField = ({ field, userValue, isEditing, editFormData, handleChange }) => {
    const displayValue = userValue || "Не вказано";
    
    return (
        <div className="space-y-1 p-3 rounded-lg bg-gray-50 border border-gray-100 transition duration-150 hover:shadow-md">
            <h3 className="text-xs font-semibold text-gray-500 uppercase flex items-center">
                <span className="mr-2 text-sm">{field.icon}</span> {field.label}
            </h3>

            {isEditing ? (
                // РЕЖИМ РЕДАГУВАННЯ
                <input
                    type={field.type || "text"}
                    name={field.key}
                    value={editFormData[field.key] || ""}
                    onChange={handleChange}
                    required={field.key.includes("License") || field.key === "phone"}
                    className="w-full px-3 py-1.5 border-2 border-blue-400 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    placeholder={field.label}
                />
            ) : (
                // РЕЖИМ ПЕРЕГЛЯДУ
                <p className={`text-base font-medium ${displayValue === "Не вказано" ? "text-red-600 italic" : "text-gray-900"}`}>
                    {displayValue}
                </p>
            )}
        </div>
    );
};


const Profile = () => {
    const { user, updateUser, logout } = useAuth();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({});

    // Ініціалізація даних форми
    useEffect(() => {
        if (user) {
            setEditFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                birthDate: user.birthDate || "",
                phone: user.phone || "",
                city: user.city || "",
                country: user.country || "",
                driverLicenseNumber: user.driverLicenseNumber || "",
                driverLicenseIssueDate: user.driverLicenseIssueDate || "",
            });
        }
    }, [user]);

    if (!user) {
        return (
            <div className="p-8 text-center bg-white shadow-lg rounded-xl mt-10 max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Доступ заборонено</h2>
                <Link to="/login" className="text-blue-500 hover:underline">
                    Перейти до входу
                </Link>
            </div>
        );
    }

    // 1. Структура полів з іконками
    const profileFields = [
        { label: "Імʼя", key: "firstName", icon: "👤" },
        { label: "Прізвище", key: "lastName", icon: "👤" },
        { label: "Дата народження", key: "birthDate", icon: "🎂", type: "date" },
        { label: "Телефон", key: "phone", icon: "📞" },
        { label: "Місто", key: "city", icon: "🏙️" },
        { label: "Країна", key: "country", icon: "🌍" },
        { label: "Номер посвідчення", key: "driverLicenseNumber", icon: "🪪" },
        { label: "Дата видачі посвідчення", key: "driverLicenseIssueDate", icon: "📅", type: "date" },
    ];

    // 2. Обробники
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        // ... (Логіка валідації та updateUser) ...
        try {
            // await updateUser(editFormData); // Розкоментувати після підключення API
            setIsEditing(false);
            alert("Зміни збережено!");
        } catch (err) {
            console.error(err);
            alert("Помилка збереження!");
        }
    };

    const handleCancel = () => {
        // Скидаємо зміни до поточних даних
        setEditFormData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            birthDate: user.birthDate || "",
            phone: user.phone || "",
            city: user.city || "",
            country: user.country || "",
            driverLicenseNumber: user.driverLicenseNumber || "",
            driverLicenseIssueDate: user.driverLicenseIssueDate || "",
        });
        setIsEditing(false);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    // --- ОСНОВНИЙ РЕНДЕР ---
    return (
        <div className="min-h-[70vh] flex justify-center items-start py-12 bg-gray-100">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-3xl border border-gray-100 overflow-hidden">

                {/* 1. HEADER (Gradient Background) */}
                <header
                    className={`p-8 text-white flex justify-between items-center 
                        ${isEditing 
                            ? "bg-gradient-to-r from-orange-500 to-red-500" 
                            : "bg-gradient-to-r from-blue-600 to-blue-800"} 
                        shadow-xl transition-colors duration-300`}
                >
                    <h1 className="text-3xl font-extrabold tracking-wide">
                        {isEditing ? "Редагування даних" : "Ваш Особистий Кабінет"}
                    </h1>

                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-5 py-2 bg-white text-blue-700 rounded-full text-md font-bold shadow-lg hover:bg-gray-100 transition duration-150 transform hover:scale-105"
                        >
                            Змінити 🖊️
                        </button>
                    )}
                </header>

                {/* 2. MAIN FORM */}
                <form onSubmit={handleSave}>
                    <div className="p-8">

                        {/* СЕКЦІЯ КОНТАКТІВ та АВАТАР */}
                        <div className="flex flex-col md:flex-row items-center mb-10 pb-6 border-b-4 border-dashed border-blue-100">
                            
                            {/* Аватар (велике коло) */}
                            <div className="flex-shrink-0 w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-4xl font-bold mr-8 shadow-2xl mb-4 md:mb-0">
                                {user.firstName ? user.firstName[0].toUpperCase() : "Я"}
                            </div>

                            {/* Інформація про користувача */}
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
                                    {user.firstName || "Гість"} {user.lastName || "Користувач"}
                                </h2>
                                <p className="text-xl text-blue-600 font-medium mt-1">
                                    <span className="mr-1">📧</span>{user.email}
                                </p>
                            </div>
                        </div>

                        {/* СЕКЦІЯ ДЕТАЛЕЙ ПРОФІЛЮ */}
                        <h2 className="text-2xl font-bold text-gray-700 mb-6 border-l-4 border-blue-500 pl-3">
                            Персональні та Водійські Дані
                        </h2>

                        {/* Поля профілю в сітці */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {profileFields.map((field) => (
                                <ProfileField
                                    key={field.key}
                                    field={field}
                                    userValue={user[field.key]}
                                    isEditing={isEditing}
                                    editFormData={editFormData}
                                    handleChange={handleChange}
                                />
                            ))}
                        </div>
                    </div>

                    {/* 3. FOOTER BUTTONS - КРАСИВЕ РОЗТАШУВАННЯ */}
                    <div className="p-6 bg-gray-50 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                        
                        {isEditing ? (
                            // РЕЖИМ РЕДАГУВАННЯ: Скасувати зліва, Зберегти справа
                            <>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="w-full md:w-auto px-8 py-2 border-2 border-gray-400 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition shadow-md"
                                >
                                    Скасувати
                                </button>
                                <div className="md:ml-auto flex flex-col md:flex-row gap-4 w-full md:w-auto">
                                    <button
                                        type="submit"
                                        className="w-full px-8 py-2 bg-green-600 text-white rounded-lg font-semibold shadow-lg hover:bg-green-700 transition duration-150 transform hover:scale-105"
                                    >
                                        Зберегти зміни
                                    </button>
                                </div>
                            </>
                        ) : (
                            // РЕЖИМ ПЕРЕГЛЯДУ: Історія зліва, Вийти справа
                            <>
                                <Link
                                    to="/history"
                                    className="w-full md:w-auto px-8 py-2 border-2 border-blue-600 text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition duration-150 shadow-md"
                                >
                                    Історія Оренд
                                </Link>

                                <div className="md:ml-auto flex flex-col md:flex-row gap-4 w-full md:w-auto">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-8 py-2 bg-red-600 text-white rounded-lg font-semibold shadow-lg hover:bg-red-700 transition duration-150"
                                    >
                                        Вийти
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;