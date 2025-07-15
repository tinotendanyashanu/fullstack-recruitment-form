import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

export default function ThankYou() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Card className="max-w-lg w-full mx-2">
        <CardBody className="text-center">
          <h1 className="text-3xl font-bold mb-3 text-primary">Thank You!</h1>
          <p className="mb-6 text-lg">
            Your application has been received.<br />
            We appreciate your interest in joining our team.<br />
            We&apos;ll review your submission and reach out if you&apos;re shortlisted.
          </p>
          <Button as={Link} href="https://www.digitalgeeks.pl/" color="primary" variant="shadow">
            Back to Home
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
