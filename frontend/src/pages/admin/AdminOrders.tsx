import React, { useState } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { orderService } from '../../services/OrderService';
import AdminLayout from '../../layouts/AdminLayout';
import Modal from '../../components/Modal';
import type { Order, OrderLine } from '../../types/Order';
import './AdminOrders.css';

const AdminOrders: React.FC = () => {
    const { orders, loading, error, refetch, deleteOrder } = useOrders();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [orderLines, setOrderLines] = useState<OrderLine[]>([]);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewDetails = async (order: Order) => {
        setSelectedOrder(order);
        setLoadingDetails(true);
        setIsModalOpen(true);

        try {
            const lines = await orderService.getOrderLines(order.commandNumber);
            setOrderLines(lines);
        } catch (err) {
            console.error('Erreur lors du chargement des détails:', err);
            setOrderLines([]);
        } finally {
            setLoadingDetails(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
        setOrderLines([]);
    };

    const handleDelete = async (commandNumber: string) => {
        const confirmed = window.confirm(
            `Êtes-vous sûr de vouloir supprimer la commande "${commandNumber}" ?`
        );

        if (!confirmed) return;

        const success = await deleteOrder(commandNumber);

        if (success) {
            await refetch();
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'En attente';
            case 'COMPLETED':
                return 'Terminée';
            case 'CANCELLED':
                return 'Annulée';
            default:
                return status;
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'status-pending';
            case 'COMPLETED':
                return 'status-completed';
            case 'CANCELLED':
                return 'status-cancelled';
            default:
                return '';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const calculateTotal = () => {
        return orderLines.reduce((sum, line) => sum + (line.unitPrice * line.quantity), 0);
    };

    if (loading) return <AdminLayout><div className="loading">Chargement...</div></AdminLayout>;
    if (error) return <AdminLayout><div className="error">Erreur: {error}</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="admin-orders-container">
                <header className="orders-header">
                    <h1>Gestion des Commandes</h1>
                    <span className="orders-count">{orders.length} commande{orders.length > 1 ? 's' : ''}</span>
                </header>

                <div className="orders-table-container">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>N° Commande</th>
                                <th>Client</th>
                                <th>Date</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="no-orders">
                                        Aucune commande enregistrée
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr
                                        key={order.commandNumber}
                                        className="order-row"
                                        onClick={() => handleViewDetails(order)}
                                    >
                                        <td>{order.commandNumber}</td>
                                        <td>{order.email}</td>
                                        <td>{formatDate(order.orderDate)}</td>
                                        <td>
                                            <span className={`status-tag ${getStatusClass(order.status)}`}>
                                                {getStatusLabel(order.status)}
                                            </span>
                                        </td>
                                        <td className="actions-cell">
                                            <button
                                                className="btn-view"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleViewDetails(order);
                                                }}
                                                aria-label="Voir les détails"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                                    <circle cx="12" cy="12" r="3"/>
                                                </svg>
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(order.commandNumber);
                                                }}
                                                aria-label="Supprimer"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="3 6 5 6 21 6"/>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                                    <line x1="10" y1="11" x2="10" y2="17"/>
                                                    <line x1="14" y1="11" x2="14" y2="17"/>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title={`Commande ${selectedOrder?.commandNumber || ''}`}
                >
                    {selectedOrder && (
                        <div className="order-details">
                            <div className="order-info">
                                <div className="info-row">
                                    <span className="info-label">Client:</span>
                                    <span className="info-value">
                                        {selectedOrder.clientFirstName} {selectedOrder.clientLastName}
                                    </span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Email:</span>
                                    <span className="info-value">{selectedOrder.email}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Tél:</span>
                                    <span className="info-value">
                                        {selectedOrder.clientPhoneNumber || '-'}
                                    </span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Date:</span>
                                    <span className="info-value">{formatDate(selectedOrder.orderDate)}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Statut:</span>
                                    <span className={`status-tag ${getStatusClass(selectedOrder.status)}`}>
                                        {getStatusLabel(selectedOrder.status)}
                                    </span>
                                </div>
                            </div>

                            <h3>Produits commandés</h3>

                            {loadingDetails ? (
                                <p className="loading-text">Chargement des produits...</p>
                            ) : orderLines.length === 0 ? (
                                <p className="no-products">Aucun produit dans cette commande</p>
                            ) : (
                                <>
                                    <table className="order-lines-table">
                                        <thead>
                                            <tr>
                                                <th>Photo</th>
                                                <th>Produit</th>
                                                <th>Prix unitaire</th>
                                                <th>Quantité</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderLines.map((line) => (
                                                <tr key={line.productCode}>
                                                    <td>
                                                        <img
                                                            src={line.productImageUrl || '/placeholder.png'}
                                                            alt={line.productName}
                                                            className="order-product-thumbnail"
                                                        />
                                                    </td>
                                                    <td>{line.productName || line.productCode}</td>
                                                    <td>{line.unitPrice.toFixed(2)} €</td>
                                                    <td>{line.quantity}</td>
                                                    <td>{(line.unitPrice * line.quantity).toFixed(2)} €</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="order-total">
                                        <span>Total:</span>
                                        <span className="total-amount">{calculateTotal().toFixed(2)} €</span>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </Modal>
            </div>
        </AdminLayout>
    );
};

export default AdminOrders;
