import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const CallToActionSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: { name: string; email: string }) => {
      return await apiRequest("POST", "/api/newsletter/subscribe", data);
    },
    onSuccess: () => {
      toast({
        title: "Subscription Successful",
        description: "You have been subscribed to our newsletter.",
        variant: "default",
      });
      setName("");
      setEmail("");
    },
    onError: (error) => {
      toast({
        title: "Subscription Failed",
        description: error.message || "An error occurred during subscription.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, email });
  };

  return (
    <section className="relative py-20 bg-cover bg-center" 
      style={{ backgroundImage: `url('https://pixabay.com/get/g6d2a1a0970f78c9b91ed9adf3e6aa8d3aaa86e5cbfdc021ed96aa15c9045e91e79c68aed12ef3e7e6d24c1fd7af8eb0a695eea98dd6257a2d451a197334fff10_1280.jpg')` }}
    >
      <div className="absolute inset-0 bg-burgundy bg-opacity-80"></div>
      <div className="relative container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-heading text-white mb-4">Join Our Spiritual Community</h2>
        <p className="text-xl text-white opacity-90 max-w-3xl mx-auto mb-8">
          Connect with fellow believers, receive updates on holy days, and deepen your understanding of the Ethiopian Orthodox faith.
        </p>
        <Card className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <CardContent className="p-0">
            <h3 className="font-heading text-burgundy text-xl mb-4">Subscribe to Our Newsletter</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input 
                  type="text" 
                  placeholder="Your Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy"
                />
                <Input 
                  type="email" 
                  placeholder="Your Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy"
                />
              </div>
              <Button 
                type="submit" 
                disabled={mutation.isPending}
                className="w-full bg-burgundy text-white font-semibold py-3 px-6 rounded-md hover:bg-opacity-90 transition duration-300"
              >
                {mutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CallToActionSection;
