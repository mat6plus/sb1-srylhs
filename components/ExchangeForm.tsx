"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  fromCurrency: z.string().min(1, { message: "From currency is required" }),
  toCurrency: z.string().min(1, { message: "To currency is required" }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
  cryptoCurrency: z.string().min(1, { message: "Cryptocurrency is required" }),
});

const ExchangeForm = () => {
  const [exchangeRate, setExchangeRate] = useState(1);
  const [cryptoAmount, setCryptoAmount] = useState(0);
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromCurrency: "USD",
      toCurrency: "EUR",
      amount: "",
      cryptoCurrency: "BTC",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Simulate exchange rate calculation
    const simulatedRate = Math.random() * (1.5 - 0.5) + 0.5;
    setExchangeRate(simulatedRate);
    
    // Simulate crypto conversion
    const cryptoRate = Math.random() * (0.0001 - 0.00001) + 0.00001;
    setCryptoAmount(Number(values.amount) * simulatedRate * cryptoRate);

    toast({
      title: "Exchange Calculated",
      description: `${values.amount} ${values.fromCurrency} = ${(Number(values.amount) * simulatedRate).toFixed(2)} ${values.toCurrency}`,
    })
  };

  const handlePurchase = () => {
    toast({
      title: "Purchase Initiated",
      description: "You're being redirected to complete your cryptocurrency purchase.",
    })
    // Implement redirection logic here
  };

  return (
    <div className="bg-card shadow-lg rounded-lg p-6 max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fromCurrency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From Currency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="toCurrency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To Currency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Calculate Exchange</Button>
        </form>
      </Form>
      
      {exchangeRate !== 1 && (
        <div className="mt-6 p-4 bg-muted rounded-md">
          <h3 className="font-semibold mb-2">Exchange Result</h3>
          <p>1 {form.getValues().fromCurrency} = {exchangeRate.toFixed(4)} {form.getValues().toCurrency}</p>
          <p className="mt-2">Converted Amount: {(Number(form.getValues().amount) * exchangeRate).toFixed(2)} {form.getValues().toCurrency}</p>
        </div>
      )}
      
      {cryptoAmount > 0 && (
        <div className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handlePurchase)} className="space-y-6">
              <FormField
                control={form.control}
                name="cryptoCurrency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cryptocurrency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cryptocurrency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                        <SelectItem value="XRP">Ripple (XRP)</SelectItem>
                        <SelectItem value="LTC">Litecoin (LTC)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="p-4 bg-muted rounded-md">
                <p>Estimated {form.getValues().cryptoCurrency} Amount: {cryptoAmount.toFixed(8)}</p>
              </div>
              <Button type="submit" className="w-full">Purchase Cryptocurrency</Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ExchangeForm;