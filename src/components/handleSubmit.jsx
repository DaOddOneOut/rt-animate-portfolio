const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    setSubmitting(false);
    return;
  }

   try {
    const response = await fetch("https://formspree.io/f/xpwdvavv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
      setErrors({});
    } else {
      alert("Oops! Something went wrong.");
    }
  } catch (err) {
    alert("Network error. Try again later.");
  } finally {
    setSubmitting(false);
  }
};