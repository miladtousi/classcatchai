-- Create storage bucket for lesson files (PDFs, etc.)
INSERT INTO storage.buckets (id, name, public)
VALUES ('lesson-files', 'lesson-files', false);

-- Create storage bucket for generated media (audio/video)
INSERT INTO storage.buckets (id, name, public)
VALUES ('lesson-media', 'lesson-media', true);

-- RLS policies for lesson-files bucket (private - teachers only)
CREATE POLICY "Teachers can upload lesson files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'lesson-files' 
  AND public.has_role(auth.uid(), 'teacher')
);

CREATE POLICY "Teachers can view their own lesson files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'lesson-files' 
  AND public.has_role(auth.uid(), 'teacher')
);

CREATE POLICY "Teachers can delete their own lesson files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'lesson-files' 
  AND public.has_role(auth.uid(), 'teacher')
);

-- RLS policies for lesson-media bucket (public read, teachers write)
CREATE POLICY "Anyone can view lesson media"
ON storage.objects FOR SELECT
USING (bucket_id = 'lesson-media');

CREATE POLICY "Teachers can upload lesson media"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'lesson-media' 
  AND public.has_role(auth.uid(), 'teacher')
);

CREATE POLICY "Teachers can update lesson media"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'lesson-media' 
  AND public.has_role(auth.uid(), 'teacher')
);

CREATE POLICY "Teachers can delete lesson media"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'lesson-media' 
  AND public.has_role(auth.uid(), 'teacher')
);