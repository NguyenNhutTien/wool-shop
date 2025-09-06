import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Phone, Mail, MessageCircle, Trash2 } from 'lucide-react';
import { api } from '../../lib/api';
import toast from 'react-hot-toast';

interface Contact {
  _id: string;
  name: string;
  phone: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export default function ContactManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const queryClient = useQueryClient();

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: async () => {
      const response = await api.get('/contacts');
      return response.data.data || [];
    }
  });

  const deleteContactMutation = useMutation({
    mutationFn: async (contactId: string) => {
      await api.delete(`/contacts/${contactId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contacts'] });
      toast.success('Xóa tin nhắn thành công!');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi xóa tin nhắn');
    }
  });

  const filteredContacts = contacts?.filter((contact: Contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm) ||
    contact.message.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleDeleteContact = (contactId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tin nhắn này?')) {
      deleteContactMutation.mutate(contactId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý tin nhắn liên hệ</h1>
        <p className="text-gray-600 mt-2">Xem và quản lý tin nhắn từ khách hàng</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, SĐT hoặc nội dung tin nhắn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact: Contact) => (
          <div key={contact._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Phone className="h-4 w-4 mr-1" />
                  {contact.phone}
                </div>
              </div>
              <button
                onClick={() => handleDeleteContact(contact._id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 text-sm line-clamp-3">
                {contact.message}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {new Date(contact.createdAt).toLocaleDateString('vi-VN')}
              </span>
              <button
                onClick={() => setSelectedContact(contact)}
                className="text-pink-600 hover:text-pink-800 text-sm font-medium"
              >
                Xem chi tiết
              </button>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 flex gap-2">
              <a
                href={`tel:${contact.phone}`}
                className="flex-1 bg-green-100 text-green-700 px-3 py-2 rounded-md text-sm font-medium text-center hover:bg-green-200 flex items-center justify-center"
              >
                <Phone className="h-4 w-4 mr-1" />
                Gọi
              </a>
              <a
                href={`https://zalo.me/${contact.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm font-medium text-center hover:bg-blue-200 flex items-center justify-center"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Zalo
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Chưa có tin nhắn liên hệ nào</p>
        </div>
      )}

      {/* Contact Detail Modal */}
      {selectedContact && (
        <ContactDetailModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </div>
  );
}

// Contact Detail Modal Component
interface ContactDetailModalProps {
  contact: Contact;
  onClose: () => void;
}

function ContactDetailModal({ contact, onClose }: ContactDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Chi tiết tin nhắn</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Contact Info */}
        <div className="mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Tên khách hàng</p>
                <p className="font-medium text-lg">{contact.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Số điện thoại</p>
                <p className="font-medium flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  {contact.phone}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Thời gian gửi</p>
                <p className="font-medium">
                  {new Date(contact.createdAt).toLocaleString('vi-VN')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Nội dung tin nhắn</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="whitespace-pre-wrap">{contact.message}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <a
            href={`tel:${contact.phone}`}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg text-center hover:bg-green-600 flex items-center justify-center"
          >
            <Phone className="h-4 w-4 mr-2" />
            Gọi điện
          </a>
          <a
            href={`https://zalo.me/${contact.phone.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-600 flex items-center justify-center"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Nhắn Zalo
          </a>
        </div>
      </div>
    </div>
  );
}
