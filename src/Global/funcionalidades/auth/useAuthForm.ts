import { useState } from 'react';

interface Errores {
    nombre?: string;
    email?: string;
    password?: string;
    telefono?: string;
    direccion?: string;
}

export function useAuthForm(conNombre = false) {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [logo, setLogo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errores, setErrores] = useState<Errores>({});

    const limpiarError = (campo: keyof Errores) =>
        setErrores(prev => ({ ...prev, [campo]: undefined }));

    const validar = (rol?: 'cliente' | 'negocio'): boolean => {
        const nuevos: Errores = {};
        if (conNombre && !nombre.trim()) {
            nuevos.nombre = rol === 'negocio' ? 'Ingresa el nombre de la empresa.' : 'Ingresa tu nombre completo.';
        }
        
        if (rol === 'negocio') {
            if (!telefono.trim()) nuevos.telefono = 'Ingresa el teléfono de la empresa.';
            if (!direccion.trim()) nuevos.direccion = 'Ingresa la dirección de la empresa.';
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

    return { 
        nombre, setNombre, 
        telefono, setTelefono,
        direccion, setDireccion,
        logo, setLogo,
        email, setEmail, 
        password, setPassword, 
        errores, limpiarError, validar 
    };
}
