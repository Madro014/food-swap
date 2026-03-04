import { useState } from 'react';

interface Errores {
    nombre?: string;
    email?: string;
    password?: string;
}

export function useAuthForm(conNombre = false) {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errores, setErrores] = useState<Errores>({});

    const limpiarError = (campo: keyof Errores) =>
        setErrores(prev => ({ ...prev, [campo]: undefined }));

    const validar = (): boolean => {
        const nuevos: Errores = {};
        if (conNombre && !nombre.trim()) {
            nuevos.nombre = 'Ingresa tu nombre completo.';
        }
        if (!email.includes('@') || !email.includes('.')) {
            nuevos.email = 'Ingresa un correo electrónico válido.';
        }
        if (password.length < 6) {
            nuevos.password = 'La contraseña debe tener al menos 6 caracteres.';
        }
        setErrores(nuevos);
        return Object.keys(nuevos).length === 0;
    };

    return { nombre, setNombre, email, setEmail, password, setPassword, errores, limpiarError, validar };
}
