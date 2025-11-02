<script lang="ts">
  import { z } from 'zod';
  import { Mail, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-svelte';
  import { shake, hoverScale } from '../lib/animations';
  import gsap from 'gsap';

  // Zod schema for form validation
  const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters')
  });

  type ContactForm = z.infer<typeof contactSchema>;

  let formData: ContactForm = {
    name: '',
    email: '',
    message: ''
  };

  let errors: Partial<Record<keyof ContactForm, string>> = {};
  let successMessage = '';
  let formContainer: HTMLDivElement | undefined;

  function handleSubmit(event: Event) {
    event.preventDefault();
    errors = {};
    successMessage = '';

    try {
      const validatedData = contactSchema.parse(formData);
      
      successMessage = 'Form submitted successfully!';
      gsap.from('.success-message', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
      });

      setTimeout(() => {
        formData = { name: '', email: '', message: '' };
        successMessage = '';
      }, 3000);

    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof ContactForm;
          errors[field] = issue.message;
        });

        if (formContainer) {
          shake(formContainer);
        }
      }
    }
  }
</script>

<div bind:this={formContainer} class="form-container max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
  <h2 class="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
    <MessageSquare size={28} />
    Contact Form
  </h2>

  <form on:submit={handleSubmit} class="space-y-4">
    <div>
      <label class="flex items-center gap-2 text-gray-700 font-medium mb-2">
        <User size={18} />
        Name
      </label>
      <input
        type="text"
        bind:value={formData.name}
        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent {errors.name ? 'border-red-500' : 'border-gray-300'}"
        placeholder="John Doe"
      />
      {#if errors.name}
        <p class="text-red-500 text-sm mt-1 flex items-center gap-1">
          <AlertCircle size={14} />
          {errors.name}
        </p>
      {/if}
    </div>

    <div>
      <label class="flex items-center gap-2 text-gray-700 font-medium mb-2">
        <Mail size={18} />
        Email
      </label>
      <input
        type="email"
        bind:value={formData.email}
        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent {errors.email ? 'border-red-500' : 'border-gray-300'}"
        placeholder="john@example.com"
      />
      {#if errors.email}
        <p class="text-red-500 text-sm mt-1 flex items-center gap-1">
          <AlertCircle size={14} />
          {errors.email}
        </p>
      {/if}
    </div>

    <div>
      <label class="flex items-center gap-2 text-gray-700 font-medium mb-2">
        <MessageSquare size={18} />
        Message
      </label>
      <textarea
        bind:value={formData.message}
        rows="4"
        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent {errors.message ? 'border-red-500' : 'border-gray-300'}"
        placeholder="Your message here..."
      ></textarea>
      {#if errors.message}
        <p class="text-red-500 text-sm mt-1 flex items-center gap-1">
          <AlertCircle size={14} />
          {errors.message}
        </p>
      {/if}
    </div>

    <button
      use:hoverScale={'small'}
      type="submit"
      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors will-change-transform"
    >
      Submit
    </button>
  </form>

  {#if successMessage}
    <div class="success-message mt-4 p-4 bg-green-100 border border-green-400 rounded-lg flex items-center gap-2 text-green-700">
      <CheckCircle size={20} />
      {successMessage}
    </div>
  {/if}
</div>

<style>
  input:focus,
  textarea:focus {
    outline: none;
  }
</style>
