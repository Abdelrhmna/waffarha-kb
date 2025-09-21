type Props = { params: { slug: string } };

export default function LibraryItemPage({ params }: Props) {
  const { slug } = params;
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">تفاصيل العنصر</h1>
        <p className="text-gray-600">المعرف (slug): {slug}</p>
      </div>
    </div>
  );
}
