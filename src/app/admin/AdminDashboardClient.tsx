'use client';

import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import {
  ShieldCheck,
  Lock,
  Users,
  Coins,
  FileText,
  CheckCircle2,
  Eye,
  Plus,
  Layers,
  Mail,
} from 'lucide-react';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';


import {VolunteerStatus } from '@/types';

export default function AdminDashboardClient() {
  const { data: session } = useSession();

  type ContactMessage = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
    createdAt: string;
  };

  const [messages, setMessages] = useState<ContactMessage[]>([]);

useEffect(() => {
  async function fetchMessages() {
    try {
      const res = await fetch('/api/contact');

console.log('CONTACT API STATUS:', res.status);

const text = await res.text();

console.log('CONTACT API RESPONSE:', text);

if (!res.ok) {
  console.error('CONTACT API ERROR:', res.status, text);
  return;
}

const data = JSON.parse(text);

console.log('CONTACT DATA:', data);

setMessages(data.data || []);
    } catch (error) {
      console.error('Failed to fetch contact messages:', error);
    }
  }

  fetchMessages();
}, []);
const currentRole = session?.user?.role as string | undefined;

  const [activeTab, setActiveTab] = useState<
    'overview' | 'volunteers' | 'finance' | 'initiatives' | 'messages'
  >('overview');

  const [volunteers, setVolunteers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchVolunteers() {
      try {
        const res = await fetch('/api/volunteers');
        const data = await res.json();

        if (res.ok) {
          setVolunteers(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch volunteers:', error);
      }
    }

    fetchVolunteers();
  }, []);

  const [transactions, setTransactions] = useState<any[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);

  const [initiatives, setInitiatives] = useState<any[]>([]);
  const [initiativesLoading, setInitiativesLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const response = await fetch('/api/transactions');
        const result = await response.json();

        if (result.success) {
          setTransactions(
            result.data.map((transaction: any) => ({
              ...transaction,
              amount: Number(transaction.amount),
            }))
          );
        }
      } catch (error) {
        console.error('Failed to load transactions:', error);
      } finally {
        setTransactionsLoading(false);
      }
    };

    const loadInitiatives = async () => {
      try {
        const response = await fetch('/api/initiatives');
        const result = await response.json();

        if (result.success) {
          setInitiatives(result.data);
        }
      } catch (error) {
        console.error('Failed to load initiatives:', error);
      } finally {
        setInitiativesLoading(false);
      }
    };

    loadTransactions();
    loadInitiatives();
  }, []);


  const [showAddTx, setShowAddTx] = useState(false);

  const [newTx, setNewTx] = useState({
    type: 'EXPENSE' as const,
    category: 'EDUCATION_SUPPLIES' as const,
    description: '',
    amount: '',
    paymentMethod: 'UPI / Official Account',
    initiativeId: '',
  });

  const handleUpdateVolunteerStatus = async (
  id: string,
  newStatus: VolunteerStatus
) => {
  try {
    const res = await fetch('/api/volunteers', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        status: newStatus,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Failed to update status.');
      return;
    }

    setVolunteers((prev) =>
      prev.map((v) =>
        v.id === id
          ? { ...v, status: newStatus }
          : v
      )
    );
  } catch (error) {
    console.error('Failed to update volunteer status:', error);
    alert('Something went wrong while updating the status.');
  }
};

  const handleAddTransaction = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!newTx.description || !newTx.amount) {
      return;
    }

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: newTx.type,
          category: newTx.category,
          description: newTx.description,
          amount: Number(newTx.amount),
          paymentMethod: newTx.paymentMethod,
          initiativeId: newTx.initiativeId || null,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        alert(result.message || 'Failed to create transaction.');
        return;
      }

      const savedTransaction = {
        ...result.data,
        amount: Number(result.data.amount),
      };

      setTransactions((prev) => [
        savedTransaction,
        ...prev,
      ]);

      setShowAddTx(false);

      setNewTx({
        type: 'EXPENSE',
        category: 'EDUCATION_SUPPLIES',
        description: '',
        amount: '',
        paymentMethod: 'UPI / Official Account',
        initiativeId: initiatives[0]?.id ?? '',
      });
    } catch (error) {
      console.error('Failed to create transaction:', error);
      alert('Failed to create transaction. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 space-y-8 py-10 pb-20">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-900 text-white p-6 sm:p-8 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 border border-brand-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-gold-500/20 text-gold-400 border border-gold-500/30">
                <Lock className="w-3.5 h-3.5" />
              </span>

              <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider">
                AASRA Executive Council Administration
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Administrative Command Center
            </h1>

            <p className="text-xs text-brand-200">
              Manage volunteers, verify public ledger entries,
              update initiatives, and monitor inquiries.
            </p>
          </div>

          {/* ROLE SIMULATOR */}
          <div className="flex items-center gap-3">
            <div className="bg-brand-950/60 px-4 py-3 rounded-lg border border-brand-700/70">
              <p className="text-[10px] font-bold text-brand-300 uppercase tracking-wider">
                Signed in as
              </p>

              <p className="text-sm font-semibold text-white">
                {session?.user?.name}
              </p>

              <p className="text-[10px] text-gold-400 mt-0.5">
                {currentRole}
              </p>
            </div>

            <button
              onClick={() =>
                signOut({ callbackUrl: '/admin/login' })
              }
              className="px-4 py-2 rounded-lg border border-brand-700 bg-brand-950 text-white text-xs font-semibold hover:bg-brand-800 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* SECURITY NOTICE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="p-3.5 rounded-lg bg-gold-50/70 border border-gold-300 text-xs text-brand-900 flex items-start gap-2">

          <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />

          <span>
            <strong>Administrative Security:</strong>{' '}
            Access to this dashboard is restricted to
            authenticated AASRA council members.
          </span>

        </div>
      </div>

      {/* TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex border-b border-brand-200 overflow-x-auto">

          <button
            onClick={() =>
              setActiveTab('overview')
            }
            className={`py-3 px-5 text-xs font-bold border-b-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-brand-800 text-brand-800 bg-white'
                : 'border-transparent text-brand-600 hover:text-brand-800'
            }`}
          >
            <Layers className="inline w-3.5 h-3.5 mr-2" />
            Overview & Metrics
          </button>

          {(currentRole === 'SUPER_ADMIN' ||
            currentRole === 'OUTREACH_ADMIN') && (
            <button
              onClick={() =>
                setActiveTab('volunteers')
              }
              className={`py-3 px-5 text-xs font-bold border-b-2 whitespace-nowrap ${
                activeTab === 'volunteers'
                  ? 'border-brand-800 text-brand-800 bg-white'
                  : 'border-transparent text-brand-600'
              }`}
            >
              <Users className="inline w-3.5 h-3.5 mr-2" />
              Volunteer Applications ({volunteers.length})
            </button>
          )}

          {(currentRole === 'SUPER_ADMIN' ||
            currentRole === 'FINANCE_ADMIN') && (
            <button
              onClick={() =>
                setActiveTab('finance')
              }
              className={`py-3 px-5 text-xs font-bold border-b-2 whitespace-nowrap ${
                activeTab === 'finance'
                  ? 'border-brand-800 text-brand-800 bg-white'
                  : 'border-transparent text-brand-600'
              }`}
            >
              <Coins className="inline w-3.5 h-3.5 mr-2" />
              Financial Ledger ({transactions.length})
            </button>
          )}

          {(currentRole === 'SUPER_ADMIN' ||
            currentRole === 'CONTENT_ADMIN') && (
            <button
              onClick={() =>
                setActiveTab('initiatives')
              }
              className={`py-3 px-5 text-xs font-bold border-b-2 whitespace-nowrap ${
                activeTab === 'initiatives'
                  ? 'border-brand-800 text-brand-800 bg-white'
                  : 'border-transparent text-brand-600'
              }`}
            >
              <FileText className="inline w-3.5 h-3.5 mr-2" />
              Initiatives Manager ({initiatives.length})
            </button>
          )}

          <button
            onClick={() =>
              setActiveTab('messages')
            }
            className={`py-3 px-5 text-xs font-bold border-b-2 whitespace-nowrap ${
              activeTab === 'messages'
                ? 'border-brand-800 text-brand-800 bg-white'
                : 'border-transparent text-brand-600'
            }`}
          >
            <Mail className="inline w-3.5 h-3.5 mr-2" />
            Inquiries Inbox ({messages.length})
          </button>

        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              <Card className="p-5 bg-white border-brand-200/80">
                <span className="text-xs font-semibold text-brand-600 uppercase">
                  Pending Applications
                </span>

                <p className="text-2xl font-bold text-brand-800 mt-1">
                  {
                    volunteers.filter(
                      (v) =>
                        v.status === 'PENDING' ||
                        v.status === 'UNDER_REVIEW'
                    ).length
                  }
                </p>

                <p className="text-[11px] text-brand-500 mt-2">
                  Needs orientation review
                </p>
              </Card>

              <Card className="p-5 bg-white border-brand-200/80">
                <span className="text-xs font-semibold text-brand-600 uppercase">
                  Available Balance
                </span>

                <p className="text-2xl font-bold text-gold-700 mt-1">
  ₹
  {transactions
    .reduce(
      (total, tx) =>
        total +
        (tx.type === 'INCOME'
          ? Number(tx.amount)
          : -Number(tx.amount)),
      0
    )
    .toLocaleString()}
</p>

                <p className="text-[11px] text-brand-500 mt-2">
                  Audited student trust fund
                </p>
              </Card>

              <Card className="p-5 bg-white border-brand-200/80">
                <span className="text-xs font-semibold text-brand-600 uppercase">
                  Active Programs
                </span>

                <p className="text-2xl font-bold text-brand-800 mt-1">
                  {
                    initiatives.filter(
                      (i) => i.status === 'ONGOING'
                    ).length
                  }
                </p>

                <p className="text-[11px] text-brand-500 mt-2">
                  Outreach & teaching circles
                </p>
              </Card>

              <Card className="p-5 bg-white border-brand-200/80">
                <span className="text-xs font-semibold text-brand-600 uppercase">
                  New Inquiries
                </span>

                <p className="text-2xl font-bold text-brand-800 mt-1">
                  {
                    messages.filter(
                      (m) => m.status === 'UNREAD'
                    ).length
                  }
                </p>

                <p className="text-[11px] text-brand-500 mt-2">
                  Unread messages
                </p>
              </Card>

            </div>

            <Card className="p-6 bg-white border-brand-200/80 space-y-4">

              <h3 className="text-sm font-bold text-brand-800 uppercase tracking-wider border-b border-brand-100 pb-2">
                Quick Administrative Operations
              </h3>

              <div className="flex flex-wrap gap-3">

                {(currentRole === 'SUPER_ADMIN' ||
                  currentRole === 'OUTREACH_ADMIN') && (
                  <Button
                    onClick={() => setActiveTab('volunteers')}
                    variant="primary"
                    size="sm"
                    icon={<Users className="w-4 h-4" />}
                  >
                    Review Volunteer Applicants
                  </Button>
                )}
{(currentRole === 'SUPER_ADMIN' ||
  currentRole === 'FINANCE_ADMIN') && (
                <Button
                  onClick={() => {
                    setActiveTab('finance');
                    setShowAddTx(true);
                  }}
                  variant="amber"
                  size="sm"
                  icon={<Plus className="w-4 h-4" />}
                >
                  Record New Expense / Income
                </Button>
)}
                {(currentRole === 'SUPER_ADMIN' ||
  currentRole === 'OUTREACH_ADMIN') && (
  <Button
    onClick={() =>
      setActiveTab('messages')
    }
    variant="outline"
    size="sm"
    icon={<Mail className="w-4 h-4" />}
  >
    View Inquiries Inbox
  </Button>
)}

                <Button
                  href="/transparency"
                  variant="secondary"
                  size="sm"
                  icon={<Eye className="w-4 h-4" />}
                >
                  Inspect Public Website Ledger
                </Button>

              </div>

            </Card>

          </div>
        )}

        {/* VOLUNTEERS */}
        {activeTab === 'volunteers' && (
          <Card className="p-6 bg-white border-brand-200/80 space-y-6">

            <div className="border-b border-brand-100 pb-3">
              <h3 className="text-base font-bold text-brand-800">
                Volunteer Application Submissions
              </h3>

              <p className="text-xs text-brand-600">
                Review applicant profiles, change status,
                and invite to orientation.
              </p>
            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-left text-xs text-brand-800">

                <thead className="bg-brand-100/50 border-b border-brand-200">
                  <tr>
                    <th className="py-2.5 px-3">
                      Applicant
                    </th>
                    <th className="py-2.5 px-3">
                      Department
                    </th>
                    <th className="py-2.5 px-3">
                      Availability
                    </th>
                    <th className="py-2.5 px-3">
                      Interests
                    </th>
                    <th className="py-2.5 px-3">
                      Status
                    </th>
                    <th className="py-2.5 px-3">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-brand-100">

                  {volunteers.map((vol) => (
                    <tr
                      key={vol.id}
                      className="hover:bg-brand-50/70"
                    >

                      <td className="py-3 px-3">
                        <span className="font-bold block">
                          {vol.fullName}
                        </span>

                        <span className="text-[11px] text-brand-600">
                          {vol.email} • {vol.phone}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-medium block">
                          {vol.collegeDept}
                        </span>

                        <span className="text-[11px] text-brand-600">
                          {vol.academicYear}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        {vol.availability}
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1">
                          {vol.interests.map(
                            (interest: string, i: number) => (
                              <span
                                key={i}
                                className="bg-brand-100 px-1.5 py-0.5 rounded text-[10px]"
                              >
                                {interest}
                              </span>
                            )
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <Badge size="sm">
                          {vol.status}
                        </Badge>
                      </td>

                      <td className="py-3 px-3 space-x-1">

                        <button
                          onClick={() =>
                            handleUpdateVolunteerStatus(
                              vol.id,
                              'ACCEPTED'
                            )
                          }
                          className="px-2 py-1 text-[11px] bg-gold-50 text-gold-800 rounded border border-gold-300"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() =>
                            handleUpdateVolunteerStatus(
                              vol.id,
                              'UNDER_REVIEW'
                            )
                          }
                          className="px-2 py-1 text-[11px] bg-brand-100 text-brand-800 rounded border border-brand-300"
                        >
                          Review
                        </button>

                        <button
                          onClick={() =>
                            handleUpdateVolunteerStatus(
                              vol.id,
                              'REJECTED'
                            )
                          }
                          className="px-2 py-1 text-[11px] bg-brand-50 text-brand-600 rounded border border-brand-200"
                        >
                          Decline
                        </button>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </Card>
        )}

        {/* FINANCE */}
        {activeTab === 'finance' && (
          <div className="space-y-6">

            <Card className="p-6 bg-white border-brand-200/80 space-y-4">

              <div className="flex items-center justify-between border-b border-brand-100 pb-3">

                <div>
                  <h3 className="text-base font-bold text-brand-800">
                    Council Financial Transaction Ledger
                  </h3>

                  <p className="text-xs text-brand-600">
                    Add new income or expenses; approved entries
                    are published to the public transparency page.
                  </p>
                </div>

                <Button
                  onClick={() =>
                    setShowAddTx(!showAddTx)
                  }
                  variant="amber"
                  size="sm"
                  icon={<Plus className="w-4 h-4" />}
                >
                  {showAddTx
                    ? 'Close Form'
                    : 'Record Transaction'}
                </Button>

              </div>

              {showAddTx && (
                <form
                  onSubmit={handleAddTransaction}
                  className="p-4 bg-brand-50 rounded-lg border border-brand-200 space-y-4 text-xs"
                >

                  <h4 className="font-bold text-brand-800 uppercase">
                    Enter Transaction Details
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                    <div>
                      <label className="block font-semibold mb-1">
                        Type
                      </label>

                      <select
                        value={newTx.type}
                        onChange={(e) =>
                          setNewTx({
                            ...newTx,
                            type: e.target.value as any,
                          })
                        }
                        className="w-full p-2 rounded border bg-white"
                      >
                        <option value="EXPENSE">
                          Expense
                        </option>

                        <option value="INCOME">
                          Income
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">
                        Category
                      </label>

                      <select
                        value={newTx.category}
                        onChange={(e) =>
                          setNewTx({
                            ...newTx,
                            category: e.target.value as any,
                          })
                        }
                        className="w-full p-2 rounded border bg-white"
                      >
                        <option value="EDUCATION_SUPPLIES">
                          Education Supplies
                        </option>

                        <option value="NUTRITION_AND_FOOD">
                          Nutrition & Food
                        </option>

                        <option value="HEALTHCARE_AND_HYGIENE">
                          Healthcare & Hygiene
                        </option>

                        <option value="LOGISTICS_AND_TRANSPORT">
                          Logistics & Transport
                        </option>

                        <option value="EVENT_ORGANIZATION">
                          Event Organization
                        </option>

                        <option value="INDIVIDUAL_DONATION">
                          Individual Donation
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">
                        Amount (₹)
                      </label>

                      <input
                        type="number"
                        required
                        value={newTx.amount}
                        onChange={(e) =>
                          setNewTx({
                            ...newTx,
                            amount: e.target.value,
                          })
                        }
                        className="w-full p-2 rounded border"
                        placeholder="e.g. 4500"
                      />
                    </div>

                    <div className="sm:col-span-2">

                      <label className="block font-semibold mb-1">
                        Description
                      </label>

                      <input
                        type="text"
                        required
                        value={newTx.description}
                        onChange={(e) =>
                          setNewTx({
                            ...newTx,
                            description: e.target.value,
                          })
                        }
                        className="w-full p-2 rounded border"
                        placeholder="Stationery kits for teaching circle"
                      />

                    </div>

                    <div>

                      <label className="block font-semibold mb-1">
                        Linked Initiative
                      </label>

                      <select
                        value={newTx.initiativeId}
                        onChange={(e) =>
                          setNewTx({
                            ...newTx,
                            initiativeId: e.target.value,
                          })
                        }
                        className="w-full p-2 rounded border bg-white"
                      >

                        {initiatives.map(
                          (initiative) => (
                            <option
                              key={initiative.id}
                              value={initiative.id}
                            >
                              {initiative.title}
                            </option>
                          )
                        )}

                      </select>

                    </div>

                  </div>

                  <div className="flex gap-2">

                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                    >
                      Confirm Transaction
                    </Button>

                    <Button
                      type="button"
                      onClick={() =>
                        setShowAddTx(false)
                      }
                      variant="outline"
                      size="sm"
                    >
                      Cancel
                    </Button>

                  </div>

                </form>
              )}

              <div className="overflow-x-auto">

                <table className="w-full text-left text-xs">

                  <thead className="bg-brand-100/50 border-b border-brand-200">

                    <tr>
                      <th className="py-2.5 px-3">
                        Ref ID
                      </th>

                      <th className="py-2.5 px-3">
                        Date
                      </th>

                      <th className="py-2.5 px-3">
                        Type
                      </th>

                      <th className="py-2.5 px-3">
                        Description
                      </th>

                      <th className="py-2.5 px-3">
                        Amount
                      </th>

                      <th className="py-2.5 px-3">
                        Audit
                      </th>
                    </tr>

                  </thead>

                  <tbody className="divide-y divide-brand-100">

                    {transactions.map((t) => (
                      <tr
                        key={t.id}
                        className="hover:bg-brand-50"
                      >

                        <td className="py-2.5 px-3 font-mono font-bold">
                          {t.referenceId}
                        </td>

                        <td className="py-2.5 px-3">
                          {t.date}
                        </td>

                        <td className="py-2.5 px-3">
                          <Badge size="sm">
                            {t.type}
                          </Badge>
                        </td>

                        <td className="py-2.5 px-3">
                          {t.description}
                        </td>

                        <td className="py-2.5 px-3 font-bold">
                          {t.type === 'INCOME'
                            ? '+'
                            : '-'}
                          ₹
                          {t.amount.toLocaleString()}
                        </td>

                        <td className="py-2.5 px-3">

                          <span className="text-gold-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </span>

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </Card>

          </div>
        )}

        {/* INITIATIVES */}
        {activeTab === 'initiatives' && (
          <Card className="p-6 bg-white border-brand-200/80 space-y-4">

            <h3 className="text-base font-bold text-brand-800 border-b border-brand-100 pb-2">
              Programs & Initiatives Management
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {initiatives.map(
                (initiative) => (
                  <div
                    key={initiative.id}
                    className="p-4 rounded-lg border border-brand-200 bg-brand-50 space-y-2 text-xs"
                  >

                    <Badge size="sm">
                      {initiative.status}
                    </Badge>

                    <h4 className="font-bold text-brand-800 text-sm">
                      {initiative.title}
                    </h4>

                    <p className="text-brand-700">
                      {initiative.shortDescription}
                    </p>

                    <div className="pt-2 border-t border-brand-200 flex justify-between text-brand-600 text-[11px]">

                      <span>
                        {initiative.beneficiariesCount}
                        {' '}Beneficiaries
                      </span>

                      <span>
                        ₹
                        {Number(initiative.amountSpent).toLocaleString()}
                        {' / '}
                        ₹
                        {Number(initiative.budgetAllocated).toLocaleString()}
                      </span>

                    </div>

                  </div>
                )
              )}

            </div>

          </Card>
        )}

        {/* MESSAGES */}
        {activeTab === 'messages' && (
          <Card className="p-6 bg-white border-brand-200/80 space-y-4">

    <h3 className="text-base font-bold text-brand-800 border-b border-brand-100 pb-2">
      Contact Inquiries & Correspondence Inbox
    </h3>

    <div className="space-y-3">

      {messages.length === 0 ? (
        <div className="p-8 text-center text-sm text-brand-500">
          No inquiries found.
        </div>
      ) : (
        <>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="p-4 rounded-lg border border-brand-200 bg-white space-y-2 text-xs"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">
                  <span className="font-bold">
                    {msg.name}
                  </span>

                  <span className="text-brand-600">
                    ({msg.email})
                  </span>
                </div>

                <Badge size="sm">
                  {msg.status}
                </Badge>

              </div>

              <h5 className="font-semibold">
                {msg.subject}
              </h5>

              <p className="text-brand-700 bg-brand-50 p-2.5 rounded">
                {msg.message}
              </p>

              <span className="text-[10px] text-brand-500">
                {new Date(msg.createdAt).toLocaleString()}
              </span>

            </div>
          ))}
        </>
      )}

    </div>

          </Card>
        )}

      </div>
    </div>
  );
}