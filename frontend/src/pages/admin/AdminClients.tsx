import React, { useState } from 'react';
import { useClients } from '../../hooks/useClients';
import AdminLayout from '../../layouts/AdminLayout';
import './AdminClients.css';

const AdminClients: React.FC = () => {
    const { clients, loading, error, refetch, deleteClient } = useClients();
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    const handleDelete = async (email: string, name: string) => {
        const confirmed = window.confirm(
            `Êtes-vous sûr de vouloir supprimer le client "${name}" ?`
        );

        if (!confirmed) return;

        const result = await deleteClient(email);

        if (result.success) {
            showToast(`Client "${name}" supprimé avec succès`, 'success');
            await refetch();
        } else {
            showToast(result.error || 'Erreur lors de la suppression', 'error');
        }
    };

    if (loading) return <AdminLayout><div className="loading">Chargement...</div></AdminLayout>;
    if (error) return <AdminLayout><div className="error">Erreur: {error}</div></AdminLayout>;

    return (
        <AdminLayout>
            {toast && (
                <div className={`toast toast-${toast.type}`}>
                    <span className="toast-icon">{toast.type === 'success' ? '✓' : '⚠'}</span>
                    <span className="toast-message">{toast.message}</span>
                    <button className="toast-close" onClick={() => setToast(null)}>×</button>
                </div>
            )}
            <div className="admin-clients-container">
                <header className="clients-header">
                    <h1>Gestion des Clients</h1>
                    <span className="clients-count">{clients.length} client{clients.length > 1 ? 's' : ''}</span>
                </header>

                <div className="clients-table-container">
                    <table className="clients-table">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Prénom</th>
                                <th>Nom</th>
                                <th>Téléphone</th>
                                <th>Rôle</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="no-clients">
                                        Aucun client enregistré
                                    </td>
                                </tr>
                            ) : (
                                clients.map((client) => (
                                    <tr key={client.email}>
                                        <td>{client.email}</td>
                                        <td>{client.firstName}</td>
                                        <td>{client.lastName}</td>
                                        <td>{client.phoneNumber || '-'}</td>
                                        <td>
                                            <span className={`role-tag ${client.role === 'ADMIN' ? 'role-admin' : 'role-client'}`}>
                                                {client.role === 'ADMIN' ? 'Admin' : 'Client'}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDelete(client.email, `${client.firstName} ${client.lastName}`)}
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminClients;
